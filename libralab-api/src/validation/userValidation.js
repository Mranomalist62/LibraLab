import Joi from 'joi';
import * as model from '../model/userModel.js';


export async function isUsernameAvailable(userData){
    try {
        if(userData.Nama_user !== ''){
            row = await model.getUserByName(userData.Nama_user);
            if(row.length === 0){
                return true;
            }

            else { 
                return false; 
            }
        }
        else {
            return false;
        }
    } catch (error) {
        console.log(error,'\n');
        return error;
    }
}

export async function isEmailAvailable(userData){
    try {
        if(userData.email_user !== ''){
            row = await model.getUserByEmailDb(userData.email_user);
            if(row.length === 0){
                return true;
            }

            else { 
                return false; 
            }
        }
        else {
            return false;
        }
    } catch (error) {
        console.log(error,'\n');
        return error;
    }
}

export function validateUserPost(userData){
    const schema = Joi.object({
        Nama_user : Joi.string().required(),
        ID_Provinsi : Joi.number().optional(),
        ID_Kabupaten : Joi.number().optional(),
        Ket_alamat  : Joi.string().optional(),
        notel_user  : Joi.string().optional(),
        norek_user : Joi.string().optional(),
        password_user : Joi.string().required(),
        email_user : Joi.string().email().required()
    })

    try {
        let isValid = new Promise((resolve,reject)=>{
            let isNothingRequiredNull = schema.validate(userData);
            if(isNothingRequiredNull){
                resolve(userData);
            } else {
                reject(userData);
            }
        })

        isValid
            .then(result => {
                return true;
            })
            .catch(result => {
                return false
            })
        
    } catch (error) {
        console.log(error,'\n');
        return error;
    }
}

export function validateUserPut(userData){
    const schema = Joi.object({
        Nama_user : Joi.string().optional(),
        ID_Provinsi : Joi.number().optional(),
        ID_Kabupaten : Joi.number().optional(),
        Ket_alamat  : Joi.string().optional(),
        notel_user  : Joi.string().optional(),
        norek_user : Joi.string().optional(),
        password_user : Joi.string().optional(),
        email_user : Joi.string().email().optional()
    })

    try {
        let isValid = new Promise((resolve,reject)=>{
            let isNothingRequiredNull = schema.validate(userData);
            if(isNothingRequiredNull){
                resolve(userData);
            } else {
                reject(userData);
            }
        })

        isValid
            .then(result => {
                return true;
            })
            .catch(result => {
                return false
            })
        
    } catch (error) {
        console.log(error,'\n');
        return error;
    }
}