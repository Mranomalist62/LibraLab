import Joi from 'joi';
import * as model from '../model/userModel.js';


export async function isUsernameAvailable(userData){
    try {
        if(userData.Nama_user !== ''){
            const [row] = await model.getUserByNameDb(userData.Nama_user);
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
            const row = await model.getUserByEmailDb(userData.email_user);
            if(row === null){
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

export function isDataUserPostExist(userData){
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
            let isNothingRequiredEmpty = schema.validate(userData);
            if(isNothingRequiredEmpty){
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

export function isDataUserPutExist(userData){
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
            let isNothingRequiredEmpty = schema.validate(userData);
            if(isNothingRequiredEmpty){
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

export async function isDataSignUpExist(userData) {
    const schema = Joi.object({
        Nama_user: Joi.string().required(),
        password_user: Joi.string().required(),
        email_user: Joi.string().email().required()
    });

    try {
        const { error } = schema.validate(userData);

        if (error) {
            return false;
        }

        return true;
    } catch (error) {
        console.log(error, '\n');
        return false;
    }
}


export function isDataOTPExist(userData) {
    const schema = Joi.object({
        Nama_user: Joi.string().required(),
        password_user: Joi.string().required(),
        email_user: Joi.string().email().required(),
        otp: Joi.string().required(),
    });

    const { error } = schema.validate(userData);

    if (error) {
        console.log(error, '\n');
        return false;
    } else {
        return true;
    }
}

export function isDataLoginExist(userData) {
    const schema = Joi.object({
        password_user: Joi.string().required(),
        email_user: Joi.string().email().required(),
    });

    const { error } = schema.validate(userData);

    if (error) {
        console.log(error, '\n');
        return false; 
    } else {
        return true; 
    }
}


