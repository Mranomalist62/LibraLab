import Joi from 'joi';
import * as model from '../model/authorModel.js';


export async function isAuthornameAvailable(authorData){
    try {
        if(authorData.nama_author !== ''){
            const row = await model.getAuthorByNameDb(authorData.nama_author);
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

export async function isEmailAvailable(authorData){
    try {
        if(authorData.email_author !== ''){
            const row = await model.getAuthorByEmailDb(authorData.email_author);

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

export function isDataAuthorPostExist(authorData){
    const schema = Joi.object({
        nama_author : Joi.string().required(),
        ID_Provinsi : Joi.number().optional(),
        ID_Kabupaten : Joi.number().optional(),
        Ket_alamat  : Joi.string().optional(),
        notel_author  : Joi.string().optional(),
        norek_author : Joi.string().optional(),
        password_author : Joi.string().required(),
        email_author : Joi.string().email().required()
    })

    try {
        let isValid = new Promise((resolve,reject)=>{
            let isNothingRequiredEmpty = schema.validate(authorData);
            if(isNothingRequiredEmpty){
                resolve(authorData);
            } else {
                reject(authorData);
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

export function isDataAuthorPutExist(authorData){
    const schema = Joi.object({
        nama_author : Joi.string().optional(),
        ID_Provinsi : Joi.number().optional(),
        ID_Kabupaten : Joi.number().optional(),
        Ket_alamat  : Joi.string().optional(),
        notel_author  : Joi.string().optional(),
        norek_author : Joi.string().optional(),
        password_author : Joi.string().optional(),
        email_author : Joi.string().email().optional()
    })

    try {
        let isValid = new Promise((resolve,reject)=>{
            let isNothingRequiredEmpty = schema.validate(authorData);
            if(isNothingRequiredEmpty){
                resolve(authorData);
            } else {
                reject(authorData);
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

export async function isDataSignUpExist(authorData) {
    console.log(authorData)
    const schema = Joi.object({
        nama_author: Joi.string().required(),
        password_author: Joi.string().required(),
        email_author: Joi.string().email().required()
    });

    try {
        const { error } = schema.validate(authorData);

        if (error) {
            return false;
        }
        return true;

    } catch (error) {
        console.log(error, '\n');
        return false;
    }
}


export function isDataOTPExist(authorData) {
    const schema = Joi.object({
        nama_author: Joi.string().required(),
        password_author: Joi.string().required(),
        email_author: Joi.string().email().required(),
        otp: Joi.string().required(),
    });

    const { error } = schema.validate(authorData);

    if (error) {
        console.log(error, '\n');
        return false;
    } else {
        return true;
    }
}

export function isDataLoginExist(authorData) {
    const schema = Joi.object({
        password_author: Joi.string().required(),
        email_author: Joi.string().email().required(),
    });

    const { error } = schema.validate(authorData);

    if (error) {
        console.log(error, '\n');
        return false; 
    } else {
        return true; 
    }
}


