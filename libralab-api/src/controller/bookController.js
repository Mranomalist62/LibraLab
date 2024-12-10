import * as bookModel from '../model/bookModel.js';
import * as jwtMiddleware from '../middleware/JWTMiddleware.js';
import * as path from 'path';
import fs from 'fs';

// Helper function to delete a file
const deleteFile = async (filePath) => {
  if (fs.existsSync(filePath)) {
    try {
      await fs.promises.unlink(filePath);
      console.log(`File deleted: ${filePath}`);
    } catch (error) {
      console.error(`Error deleting file: ${filePath}`, error);
    }
  }
};

export async function postBook(req, res) {
  try {
    // Validate JWT token
    const authHeader = req.cookies.jwt;
    const Token = await jwtMiddleware.isJWTValid(authHeader);

    // Token validation response handling (can adjust behavior as needed)
    if (Token === 403 || Token === 401) {
      return res.status(Token).json({
        message:
          Token === 403
            ? 'Token expired or has been tampered with'
            : 'Token is missing',
      });
    }

    // Ensure that both files (coverfile and readablefile) are uploaded
    if (!req.files || !req.files.coverfile || !req.files.readablefile) {
      return res.status(400).json({
        success: false,
        message: 'Both cover file and readable file are required',
      });
    }

    // Prepare book data
    const bookData = {
      ...req.body,
      ID_Author: Token.ID_Author || 1,
      cover_path: req.files.coverfile[0].filename, // The first file in the 'coverfile' array
      readable_path: req.files.readablefile[0].filename, // The first file in the 'readablefile' array
    };

    console.log(bookData);

    // Save book data in the database
    const result = await bookModel.postBookDb(bookData);

    if (!result || result === 503) {
      // Rollback uploaded files if database operation fails
      const coverPath = path.join(
        process.cwd(),
        '/libralab-api/media/image/book',
        req.files.coverfile[0].filename
      );
      const readablePath = path.join(
        process.cwd(),
        '/libralab-api/media/image/book',
        req.files.readablefile[0].filename
      );

      await deleteFile(coverPath);
      await deleteFile(readablePath);

      return res.status(result === 503 ? 503 : 500).json({
        message: 'Error saving book information',
      });
    }

    // Success response
    res.status(200).json({
      message: 'Book information successfully saved',
    });
  } catch (error) {
    // Rollback uploaded files on unexpected error
    if (req.files) {
      const coverPath = path.join(
        process.cwd(),
        '/libralab-api/media/image/book',
        req.files.coverfile[0].filename
      );
      const readablePath = path.join(
        process.cwd(),
        '/libralab-api/media/image/book',
        req.files.readablefile[0].filename
      );

      await deleteFile(coverPath);
      await deleteFile(readablePath);
    }

    console.error('Error in postBook:', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
}

export async function putBookByBookId(req, res) {
  try {
    const authHeader = req.cookies.jwt;
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
    const authHeader = req.cookies.jwt;
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

export async function getRandomBook(req, res) {
  try {
    const authHeader = req.cookies.jwt;
    console.log(authHeader);
    const Token = await jwtMiddleware.isJWTValid(authHeader);

    if (Token === 403) {
      res.status(403).json({ message: 'Token expire or has been tampered' });
      return;
    } else if (Token === 401) {
      res.status(401).json({ message: 'Token is missing' });
      return;
    }

    const result = await bookModel.getbookByRandomDb(req.body.limit);

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
    const authHeader = req.cookies.jwt;
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

//Future function
//getByName (for search)

//todo =? figuring out what data needed by the author page that need book, for now
