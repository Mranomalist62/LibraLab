import * as bcrypt  from 'bcrypt'
import * as userModel from '../model/userModel.js'

export async function hashPassword(userData) {
    let plainPassword = userData.password_user;
    let saltRound = process.env.SALTROUND
    try {
        let hashedpassword = await bcrypt.hash(password,saltRound);
        return hashedpassword;
    } catch (error) {
        console.log(error)
        return 500
    }
}

export async function isHashedPasswordMatch(userData,databaseData) {
    let plainPassword = userData.password_user;
    try {
        if(await bcrypt.compare(plainPassword, databaseData.password_user)) {
            return true
        } else {
            return false
        } 
    } catch (error) {
        console.log(error)
        return 500
    }
}