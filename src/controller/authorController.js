import * as authorModel from '../model/authorModel.js'
import * as authorValidation from '../validation/authorValidation.js'
import * as OTPMiddleware from '../middleware/OTPMiddleware.js'
import * as hashingMiddleware from '../middleware/hashingMiddleware.js';
import * as JWTMiddleware from '../middleware/JWTMiddleware.js'
import * as authorOTPmodel from '../model/authorOTPmodel.js'

//Author CRUD FUNCTION
export async function getAuthorByID(req, res) {
    const author_ID = req.query.id;  // Using query parameter instead of path parameter
    try {
        const authorRaw = await authorModel.getAuthorByIdDb(author_ID);

        if (!authorRaw) {
            res.status(404).json({ message: 'Author not found' });
            return;
        }

        // Destructuring the authorRaw object to extract the relevant fields
        const { nama_author, email_author, ID_author, notel_author, norek_author  } = authorRaw;

        const author = { nama_author, email_author, ID_author, notel_author, norek_author};

        res.status(200).json(author);
        return;
    } catch (error) {
        console.log(error, '\n');
        res.status(500).json({ message: 'Error retrieving Author', error });
        return;
    }
}


//Author SIGN UP & LOGIN FUNCTION
export async function initiateSignUp(req,res){
    const authorData = req.body;
    try {
        if(await authorValidation.isEmailAvailable(authorData)){
            if(await authorValidation.isDataSignUpExist(authorData)){
                let otp_status = await OTPMiddleware.sendOTPEmailVerification(authorData.email_author);
                if (otp_status.status !== 'Error'){
                    const mergedData = {
                        nama_author       : authorData.nama_author,
                        password_author   : authorData.password_author,
                        email_author      : authorData.email_author,
                        otp             : otp_status.otp
                    }
                    await authorOTPmodel.postAuthorOTPDb(mergedData);
                    res.status(200).json({message : 'OTP has been sent'});
                    return
                } else {
                    res.status(500).json({message: 'Error sending OTP'});}
                    return
            } else {
                res.status(400).json({message: 'required information is missing'});
            }
        }
        else{
            res.status(400).json({message: 'Email has been used'});
        }
    } catch (error) {
        console.log(error,'\n');
        res.status(500).json({message: 'Error sending OTP', error});
        return 
    }
}


export async function reinitiateSignUp(req,res){
    const authorData = req.body;
    try {
        if(await authorValidation.isEmailAvailable(authorData)){
            if(await authorValidation.isDataSignUpExist(authorData)){
                

                // Cek apabila masih ada otp yang lama
                const oldOTP = await authorOTPmodel.getAuthorOTPByEmailDb(authorData.email_author);

                // Jika ada, hapus
                if (oldOTP){
                    await authorOTPmodel.DeleteAuthorOTPDb(authorData);
                }                
                
                //Kirim otp yang baru
                let otp_status = await OTPMiddleware.sendOTPEmailVerification(authorData.email_author);

                if (otp_status.status !== 'Error'){
                    const mergedData = {
                        nama_author       : authorData.nama_author,
                        password_author   : authorData.password_author,
                        email_author      : authorData.email_author,
                        otp             : otp_status.otp
                    }
                    await authorOTPmodel.postAuthorOTPDb(mergedData);
                    res.status(200).json({message : 'OTP has been sent'});
                    return

                } else {
                    res.status(500).json({message: 'Error sending OTP'});}
                    return

            } else {
                res.status(404).json({message: 'required information is missing'});
            }
        }
        else{
            res.status(400).json({message: 'Email has been used'});
        }
    } catch (error) {
        console.log(error,'\n');
        res.status(500).json({message: 'Error sending OTP', error});
        return 
    }
}

export async function finishSignUp(req,res){
    const authorData = req.body;
    try {
        console.log(await authorValidation.isDataOTPExist(authorData))
        if(await authorValidation.isDataOTPExist(authorData)){
            const result = await OTPMiddleware.verifyAuthorOtp(authorData)
            if(result === 200){
                authorData.password_author = await hashingMiddleware.hashPassword(authorData.password_author);

                if (authorData.password_author === 500){
                    res.status(500).json({message: 'Hashing Error'});
                    return
                }

                const SignUpStatus = await authorModel.SignUpAuthorDb(authorData);
                if (SignUpStatus === 503 || SignUpStatus === null){
                    res.status(500).json({message: 'Query Error'});
                } else {
                    res.status(200).json({message: 'OTP confirmed, sign up success', status : 200})
                }
            } else if (result === 404){
                res.status(404).json({message: 'no OTP found for said address, sign up failed'});
            } else if (result === 400){
                res.status(400).json({message: 'otp is expired, initiate sign up again'});
            } else {
                res.status(500).json({message: 'Error verifying OTP,  sign up failed'});
            }
        } else {
            res.status(400).json({message: 'required information is missing'});
        }
    } catch (error) {
        console.log(error,'\n');
        res.status(500).json({message: 'Error verifying OTP', error});
        return 
    }
}

export async function loginAuthor(req,res){
    const authorData = req.body;
    try {
        if(await authorValidation.isDataLoginExist(authorData)){
            const result = await authorModel.getAuthorByEmailDb(authorData.email_author)
            if(result !== null)
            {
                if(await hashingMiddleware.isHashedPasswordMatch(authorData.password_author,result.password_author))
                {
                    const token = await JWTMiddleware.generateJWTAuthor(result)
                    if (token === 500)
                    {
                        res.status(500).json({message: 'Cannot Generating Token'});
                        
                    } else {
                        res.cookie('jwt',token,{
                            httpOnly : true,
                            secure: true , // Use only over HTTPS
                            SameSite: 'None',
                            maxAge: 12 * 60 * 60 * 1000,
                            domain: '.libralab.my.id',
                            path : '/'
                        });
                        res.status(200).json({message: 'Credential confirmed, Login success'})   
                    }

                } else {
                    res.status(400).json({message: 'Wrong Credential, login failed'});
                }

            } else {
                res.status(404).json({message: 'Author not found'});
            }
        } else {
            res.status(400).json({message: 'required information is missing'});
        }
    } catch (error) {
        console.log(error,'\n');
        res.status(500).json({message: 'Error verifying credential', error});
        return 
    }
}

//AUTHOR PROFILE CRUD FUNCTION

export async function putAuthorData(req, res) {
    try {
        // Extract the JWT token from cookies
        const authHeader = req.cookies.jwt;

        // Validate the token and extract the payload
        const Token = await JWTMiddleware.isJWTValid(authHeader);

        if (Token === 403) {
            return res.status(403).json({
                message: 'Token expired or has been tampered with.',
            });
        } else if (Token === 401) {
            return res.status(401).json({
                message: 'Token is missing.',
            });
        }

        // Extract author ID from the validated token
        const authorId = Token.ID_Author; // Adjust this based on your token payload structure

        // Get author data from the request body
        const authorData = req.body;

        if (!authorData) {
            return res.status(400).json({ message: 'Missing author data in the request body.' });
        }

        // Call the database function to update the author
        const result = await authorModel.putAuthorDb(authorData, authorId);

        if (result === 503) {
            return res.status(503).json({
                message: 'Service unavailable. Database error occurred.',
            });
        }

        if (!result) {
            return res.status(404).json({
                message: 'Author not found or no changes were made.',
            });
        }

        return res.status(200).json({
            message: 'Author updated successfully.',
            data: result,
        });
    } catch (error) {
        console.error('Error updating author:', error);
        return res.status(500).json({
            message: 'An internal server error occurred while updating the author.',
        });
    }
}
