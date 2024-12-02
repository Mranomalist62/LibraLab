import * as bookModel from '../model/bookModel.js';
import * as jwtMiddleware from '../middleware/JWTMiddleware.js';
import * as path from 'path';
import fs from 'fs';

export async function postBook(req, res) {
  try {
    const authHeader = req.headers['authorization'];
    const Token = await jwtMiddleware.isJWTValid(authHeader);

    if (Token === 403) {
      res.status(403).json({
        message: 'Token expire or has been tampered',
      });
      return;
    } else if (Token === 401) {
      res.status(401).json({
        message: 'Token is missing',
      });
      return;
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No cover file upload',
      });
    }

    // Path to the file on the server
    // const filepath = path.join('book/media/image', req.file.filename)

    console.log(req.body);

    const bookData = {
      ...req.body,
      ID_Author: Token.ID_Author,
      cover_path: req.file.filename,
    };

    const result = await bookModel.postBookDb(bookData);

    if (!result) {
      res.status(500).json({
        message: 'Error sending book Information',
      });
      return;
    }

    if (result === 503) {
      res.status(503).json({
        message: 'Error sending book Information',
      });
      return;
    }

    res.status(200).json({
      message: 'book information succesfully sent',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
    });
    console.log(error);
  }
}

export async function putBookByBookId(req, res) {
  try {
    const authHeader = req.headers['authorization'];
    const Token = await jwtMiddleware.isJWTValid(authHeader);

    if (Token === 403) {
      res.status(403).json({
        message: 'Token expire or has been tampered',
      });
      return;
    } else if (Token === 401) {
      res.status(401).json({
        message: 'Token is missing',
      });
      return;
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No new cover file upload',
      });
    }

    // Path to the file on the server
    // const filepath = path.join('book/media/image', req.file.filename)

    console.log(req.body);

    const NewbookData = {
      ...req.body,
      cover_path: req.file.filename,
    };

    const oldBookData = await bookModel.getbookByIdDb(NewbookData.ID_Buku);

    const oldimageFolderPath = path.join(
      process.cwd(),
      '/libralab-api/media/image/book',
      oldBookData.cover_path
    ); // Your folder path
    // Step 3: Check if the file exists
    if (fs.existsSync(oldimageFolderPath)) {
      // Step 4: Delete the file
      await fs.promises.unlink(oldimageFolderPath);
      // Asynchronously delete the file
      console.log(`Image deleted: ${oldimageFolderPath}`);
    } else {
      res.status(404).json({ message: 'no cover image found' });
    }

    const result = await bookModel.putBookDb(NewbookData);

    if (!result) {
      res.status(500).json({
        message: 'Error edit book Information',
      });
      return;
    }

    if (result === 503) {
      res.status(503).json({
        message: 'Error edit book Information',
      });
      return;
    }

    res.status(200).json({
      message: 'book information succesfully sent',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
    });
    console.log(error);
  }
}

export async function getBookCoverByUrl(req, res) {
  try {
    const { cover_path } = req.params;

    if (!cover_path) {
      res.status(400).json({ message: 'no url specified' });
      return;
    }

    const filePath = path.join(
      process.cwd(),
      '/libralab-api/media/image/book',
      cover_path
    );

    if (!fs.existsSync(filePath)) {
      res.status(404).json({ message: 'image not found' });
      return;
    }

    res.status(200).sendFile(filePath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.status(404).json({ message: 'image not found' });
      return;
    }
    res.status(500).json({ message: 'Internal server error' });
    console.log(error);
  }
}

export async function getBookByAuthorId(req, res) {
  try {
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    const Token = await jwtMiddleware.isJWTValid(authHeader);

    if (Token === 403) {
      res.status(403).json({ message: 'Token expire or has been tampered' });
      return;
    } else if (Token === 401) {
      res.status(401).json({ message: 'Token is missing' });
      return;
    }

    const result = await bookModel.getbookByAuthorIdDb(Token.ID_Author);

    if (!result) {
      res.status(404).json({ message: 'no Book in database for this author' });
      return;
    }

    if (result === 503) {
      res.status(503).json({ message: 'Error sending book Information' });
      return;
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.log(error);
  }
}

export async function deleteBookById(req, res) {
  try {
    const dataBuku = req.body;
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    const Token = await jwtMiddleware.isJWTValid(authHeader);

    if (Token === 403) {
      res.status(403).json({ message: 'Token expire or has been tampered' });
      return;
    } else if (Token === 401) {
      res.status(401).json({ message: 'Token is missing' });
      return;
    }

    const { cover_path } = req.body;

    const imageFolderPath = path.join(
      process.cwd(),
      '/libralab-api/media/image/book',
      cover_path
    ); // Your folder path
    // Step 3: Check if the file exists
    if (fs.existsSync(imageFolderPath)) {
      // Step 4: Delete the file
      await fs.promises.unlink(imageFolderPath);
      // Asynchronously delete the file
      console.log(`Image deleted: ${imageFolderPath}`);
    } else {
      res.status(404).json({ message: 'no cover image found' });
    }

    const result = await bookModel.deleteBookDb(dataBuku.ID_Buku);

    if (!result) {
      res.status(404).json({ message: 'no Book in database for this author' });
      return;
    }

    if (result === 503) {
      res.status(503).json({ message: 'Error deleting Book' });
      return;
    }

    res.status(200).json({ message: 'Book successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.log(error);
  }
}

//todo =? figuring out what data needed by the author page that need book, for now
