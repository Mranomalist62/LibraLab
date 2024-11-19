import * as userModel from '../model/userModel.js'
import * as userValidation from '../validation/userValidation.js'
import * as OTPMiddleware from '../middleware/OTPMiddleware.js'
import * as jwt from 'jsonwebtoken'
import { DeleteUserOTPDb } from '../model/OTPModel.js';
import * as hashingMiddleware from '../middleware/hashingMiddleware.js';


//USER CRUD
export async function getUser(req, res){
    const userId = req.params.id;
    try {
        const user = await userModel.getUserDb();
        if(user){
            res.status(200).json(user);
            return
        } else {
            res.status(404).json({message: 'User not found'});
            return
        }
    } catch(error) {
        console.log(error,'\n');
        res.status(500).json({message: 'error retrieving user', error});
        return
    }
}

export async function getUserbyID(req, res){
    const userId = req.params.id;
    try {
        const user = await userModel.getUserByIdDb(userId);
        if(user){
            res.status(200).json(user);
            return
        } else {
            res.status(404).json({message: 'User not found'});
            return
        }
    } catch(error) {
        console.log(error,'\n');
        res.status(500).json({message: 'error retrieving user', error});
        return
    }
}

export async function getUserbyName(req, res){
    const userName = req.body.Nama_user;
    try {
        const user = await userModel.getUserByNameDb(userName);
        if(user){
            res.status(200).json(user);
            return
        } else {
            res.status(404).json({message: 'User not found'});
            return
        }
    } catch(error) {
        console.log(error,'\n');
        res.status(500).json({message: 'error retrieving user', error});
        return
    }
}

export async function getUserbyEmail(req, res){
    const userEmail = req.body.email_user;
    try {
        const user = await userModel.getUserByEmailDb(userEmail);
        if(user){
            res.status(200).json(user);
            return
        } else {
            res.status(404).json({message: 'User not found'});
            return
        }
    } catch(error) {
        console.log(error,'\n');
        res.status(500).json({message: 'error retrieving user', error});
        return
    }
}

export async function postUser(req, res){
    const userData = req.body;
    try {
        
        if(!userValidation.isDataUserPostExist(userData)){
            res.status(400).json({message: 'required information is missing'});
        }

        else{
            isvalid = await userValidation.isUsernameAvailable(userData);
            if(isvalid){
                const result = await userModel.postUser(userData)
                if (result.affectedRows !==0){
                    res.status(200).json({message : 'user created succesfully'});
                    return
                } else {
                    res.status(500).json({message: 'Error sending user Information'});}
                    return
            } else {
                res.status(400).json({message: 'username already taken'});
                return
            }          
        }


    } catch (error) {
        console.log(error,'\n');
        res.status(500).json({message: 'Error sending user Information', error});
        return 
    }
}

export async function putUser(req, res){
    const userData = req.body;
    const userID = req.params.id;
    try {
        if(!userValidation.isDataUserPutExist(userData)){
            res.status(400).json({message: 'invalid data types'});
        }

        else{
            const result = await userModel.putUserDb(userData,userID);
            if(result.affectedRows!==0){
                res.status(200).json({message:'user updated successfully'});
            } else {
                res.status(404).json({message:'request not found'});
            }
        }
        
    } catch (error) {
        console.log(error,'\n');
        res.status(500).json({message: 'Error updating user Information', error});
        return 
    }
}

export async function deleteUser(req, res){
    const userId = req.params.id;
    try {
        const result = await userModel.deleteUser(userId);
        if(result.affectedRows !== 0){
            res.status(200).json({message: 'User information has been deleted'});
            return
        } else {
            res.status(404).json({message: 'User not found'});
            return
        }
    } catch(error) {
        console.log(error,'\n');
        res.status(500).json({message: 'error retrieving user', error});
        return
    }
}


//USER FUNCTION
export async function InitiateSignUp(req,res){
    const userData = req.body;
    try {
        if(userValidation.isEmailAvailable(userData.email_user)){
            if(userValidation.isDataSignUpExist(userData)){
                let otp_status = await OTPMiddleware.sendOTPEmailVerification(userData.email_user);
                if (otp_status.affectedRows !==0){
                    await postUserOTPDbP(userData);
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

export async function finishSignUp(req,res){
    const userData = req.body;
    try {
        if(userValidation.isDataOTPExist(userData)){
            const result = await OTPMiddleware.verifyOtp(userData)
            if(result === 200){
                userData.password_user = await hashingMiddleware.hashPassword(userData.password_user);
                SignUpStatus = await userModel.SignUpUserDb(userData);
                if (SignUpStatus === 503 || SignUpStatus === null){
                    res.status(500).json({message: 'Error verifying OTP', error});
                } else {
                    res.status(200).json({message: 'OTP confirmed, sign up success'})
                }
            } else if (result === 404){
                res.status(404).json({message: 'no OTP found for said address, sign up failed'});
            } else if (result === 400){
                res.status(404).json({message: 'otp is expired, initiate sign up again'});
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

export async function loginUser(req,res){
    const userData = req.body;
    try {
        if(userValidation.isDataLoginExist(userData)){
            const result = await userModel.getUserByEmailDb(userData)
            if(result !== null){
                if(hashingMiddleware.isHashedPasswordMatch(userData.password_user,result.password_user)){
                    res.status(200).json({message: 'Credential confirmed, Login success'})
                } else {
                    res.status(400).json({message: 'Wrong Credential, login failed'});
                }
            } else {
                res.status(404).json({message: 'User not found'});
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
