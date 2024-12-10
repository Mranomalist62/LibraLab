import * as bookModel from '../model/bookModel.js'
import * as jwtMiddleware from '../middleware/JWTMiddleware.js'
import * as path from 'path'
import fs from 'fs'


//to-do -> fix book controller with both pdf and image file 


export async function postBook(req, res){
    try {
        const authHeader = req.cookies.jwt;
        const Token = await jwtMiddleware.isJWTValid(authHeader);

        if(Token === 403){
            res.status(403).json({
                message: 'Token expire or has been tampered'});
            return
        }
        else if(Token === 401){
            res.status(401).json({
                message: 'Token is missing'});
            return
        }
        
        if (!req.files || (!req.files.coverfile && req.files.readablefile)) {
            return res.status(400).json({
              success: false,
              message: 'No cover file or readable file upload',
            });
          }

        const coverFile = req.files.coverfile[0];
        const readableFile = req.files.readablefile[0];
        
        const bookData = {
            ...req.body, 
            ID_Author: Token.ID_Author,
            cover_path : coverFile.filename || null,
            readable_path : readableFile.filename || null
        };
        
        const result = await bookModel.postBookDb(bookData);

        if(!result){

            //Rollback cover update
            const { cover_path } = bookData;

            const imageFolderPath = path.join(process.cwd(), '/media/image/book', cover_path);

            if (fs.existsSync(imageFolderPath)) {

                await fs.promises.unlink(imageFolderPath); 
                console.log(`Image deleted: ${imageFolderPath}`);
            }

            //Rollback readable update
            const { readable_path } = bookData;

            const readableFolderPath = path.join(process.cwd(), '/media/readable/book', readable_path);

            if (fs.existsSync(readableFolderPath)) {

                await fs.promises.unlink(readableFolderPath); 
                console.log(`Readable deleted: ${readableFolderPath}`);
            }

            res.status(500).json({
                message: 'Error sending book Information'});
            return
        }

        if(result===503){

            //Rollback cover update
            const { cover_path } = bookData;

            const imageFolderPath = path.join(process.cwd(), '/media/image/book', cover_path);

            if (fs.existsSync(imageFolderPath)) {

                await fs.promises.unlink(imageFolderPath); 
                console.log(`Image deleted: ${imageFolderPath}`);
            }

            //Rollback readable update
            const { readable_path } = bookData;

            const readableFolderPath = path.join(process.cwd(), '/media/readable/book', readable_path);

            if (fs.existsSync(readableFolderPath)) {

                await fs.promises.unlink(readableFolderPath); 
                console.log(`Readable deleted: ${readableFolderPath}`);
            }

            res.status(503).json({
                message: 'Error sending book Information'});
            return
        }

        res.status(200).json({
            message: 'book information succesfully sent'})

    } catch (error) {
        res.status(500).json({ 
            message: 'Internal server error' })
        console.log(error);
    }
}//still broken

export async function putBookByBookId(req,res){
    try {const authHeader = req.cookies.jwt;
        const Token = await jwtMiddleware.isJWTValid(authHeader);

        if(Token === 403){
            res.status(403).json({
                message: 'Token expire or has been tampered'});
            return
        }
        else if(Token === 401){
            res.status(401).json({
                message: 'Token is missing'});
            return
        }
        
        if (!req.files || (!req.files.coverfile && req.files.readablefile)) {
            res.status(400).json({
              success: false,
              message: 'No cover file or readable file upload',
            });
            return

            
          }

        const coverFile = req.files.coverfile[0];
        const readableFile = req.files.readablefile[0];
        
        const NewbookData = {
            ...req.body, 
            ID_Author: Token.ID_Author,
            cover_path : coverFile.filename || null,
            readable_path : readableFile.filename || null
        };

        const oldBookData = await bookModel.getbookByIdDb(NewbookData.ID_Buku);

        if(!oldBookData){
            res.status(404).json({message: 'no book found'});
            return
        }
        
        const result = await bookModel.putBookDb(NewbookData);

        if(!result){
            res.status(500).json({
                message: 'Error edit book Information'});
            return
        }

        if(result===503){
            res.status(503).json({
                message: 'Error edit book Information'});
            return
        }

        const oldimageFolderPath = path.join(process.cwd(), '/media/image/book', oldBookData.cover_path); // Your folder path
        // Step 3: Check if the file exists
        if (fs.existsSync(oldimageFolderPath)) {

            // Step 4: Delete the file
            await fs.promises.unlink(oldimageFolderPath); 
            // Asynchronously delete the file
            console.log(`Image deleted: ${oldimageFolderPath}`);
        }
        else {
            res.status(404).json({message: 'no cover image found'});
            return
        }
        
        const oldReadableFolderPath = path.join(process.cwd(), '/media/readable/book', oldBookData.readable_path); // Your folder path
        // Step 3: Check if the file exists
        if (fs.existsSync(oldReadableFolderPath)) {

            // Step 4: Delete the file
            await fs.promises.unlink(oldReadableFolderPath); 
            // Asynchronously delete the file
            console.log(`Readable deleted: ${oldReadableFolderPath}`);
        }
        else {
            res.status(404).json({message: 'no readable found'});
            return
        }

        res.status(200).json({message: 'book information succesfully sent'})
            return

    } catch(error) {
        res.status(500).json({ 
        message: 'Internal server error' })
        console.log(error);
    }
}


export async function getBookCoverByUrl(req,res){
    try {
        const {cover_path} = req.params;

        if(!cover_path){
            res.status(400).json({message:"no url specified"})
            return
        }

        const filePath = path.join(process.cwd(), '/media/image/book', cover_path)

        if(!fs.existsSync(filePath)){
            res.status(404).json({ message: 'image not found' })
            return
        }

        res.status(200).sendFile(filePath)
        
    } catch (error) {
        if(error.code === 'ENOENT'){
            res.status(404).json({ message: 'image not found' })
            return
        }
        res.status(500).json({ message: 'Internal server error' })
        console.log(error);
    }
}

export async function getBookReadableByUrl(req,res){
    try {
        const {readable_path} = req.params;

        if(!readable_path){
            res.status(400).json({message:"no url specified"})
            return
        }

        const filePath = path.join(process.cwd(), '/media/readable/book', readable_path)

        if(!fs.existsSync(filePath)){
            res.status(404).json({ message: 'readable not found' })
            return
        }

        res.status(200).sendFile(filePath)
        
    } catch (error) {
        if(error.code === 'ENOENT'){
            res.status(404).json({ message: 'readable not found' })
            return
        }
        res.status(500).json({ message: 'Internal server error' })
        console.log(error);
    }
}

export async function getBookByAuthorId(req,res){
    
    try {
        const authHeader = req.cookies.jwt;
        console.log(authHeader);
        const Token = await jwtMiddleware.isJWTValid(authHeader);

        if(Token === 403){
            res.status(403).json({message: 'Token expire or has been tampered'});
            return
        }
        else if(Token === 401){
            res.status(401).json({message: 'Token is missing'});
            return
        } 

        const result = await bookModel.getbookByAuthorIdDb(Token.ID_Author);
    
        if(!result){
            res.status(404).json({message: 'no Book in database for this author'});
            return
        }

        if(result===503){
            res.status(503).json({message: 'Error sending book Information'});
            return
        }

            res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
        console.log(error);
    }
}

export async function getRandomBook(req,res){
    
    try {
        const authHeader = req.cookies.jwt;
        console.log(authHeader);
        const Token = await jwtMiddleware.isJWTValid(authHeader);

        if(Token === 403){
            res.status(403).json({message: 'Token expire or has been tampered'});
            return
        }
        else if(Token === 401){
            res.status(401).json({message: 'Token is missing'});
            return
        } 

        const result = await bookModel.getbookByRandomDb(req.body.limit);
    
        if(!result){
            res.status(404).json({message: 'no Book in database for this author'});
            return
        }

        if(result===503){
            res.status(503).json({message: 'Error sending book Information'});
            return
        }

            res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
        console.log(error);
    }
}


export async function deleteBookById(req,res){
    
    try {
        const dataBuku = req.body
        const authHeader = req.cookies.jwt;
        const Token = await jwtMiddleware.isJWTValid(authHeader);

        if(Token === 403){
            res.status(403).json({message: 'Token expire or has been tampered'});
            return
        }
        else if(Token === 401){
            res.status(401).json({message: 'Token is missing'});
            return
        } 

        const DeletedBookData = await bookModel.getbookByIdDb(dataBuku.ID_Buku)

        if(!DeletedBookData){
            res.status(404).json({message: 'no Book in database for this author'});
            return
        }

        const result = await bookModel.deleteBookDb(dataBuku.ID_Buku);
    
        if(!result){
            res.status(404).json({message: 'no Book in database for this author'});
            return
        }

        if(result===503){
            res.status(503).json({message: 'Error deleting Book'});
            return
        }

        const { cover_path } = DeletedBookData;

        const imageFolderPath = path.join(process.cwd(), '/media/image/book', cover_path); // Your folder path
        // Step 3: Check if the file exists
        if (fs.existsSync(imageFolderPath)) {

            // Step 4: Delete the file
            await fs.promises.unlink(imageFolderPath); 
            // Asynchronously delete the file
            console.log(`Image deleted: ${imageFolderPath}`);
        }
        else {
            res.status(404).json({message: 'no cover image found'});
            return;
        }

        const { readable_path } = DeletedBookData;

        const oldReadableFolderPath = path.join(process.cwd(), '/media/readable/book', readable_path); // Your folder path
        // Step 3: Check if the file exists
        if (fs.existsSync(oldReadableFolderPath)) {

            // Step 4: Delete the file
            await fs.promises.unlink(oldReadableFolderPath); 
            // Asynchronously delete the file
            console.log(`Readable deleted: ${oldReadableFolderPath}`);
        }
        else {
            res.status(404).json({message: 'no readable found'});
            return
        }


        res.status(200).json({message: 'Book successfully deleted'});

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
        console.log(error);
    }
}

//Future function
//getByName (for search)

//todo =? figuring out what data needed by the author page that need book, for now