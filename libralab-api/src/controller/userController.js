import * as userModel from '../model/userModel.js';
import * as validation from '../validation/userValidation.js'

export async function getUser(req, res){
    const userId = req.params.id;
    try {
        const user = await userModel.getUserById(userId);
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
        const user = await userModel.getUserById(userId);
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
        
        if(!validation.validateUserPost(userData)){
            res.status(400).json({message: 'required information is missing'});
        }

        else{
            isvalid = await validation.isUsernameAvailable(userData);
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
        if(!validation.validateUserPost(userData)){
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



