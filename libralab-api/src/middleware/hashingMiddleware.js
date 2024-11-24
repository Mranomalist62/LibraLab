import * as bcrypt  from 'bcrypt'

export async function hashPassword(userData) {
    let plainPassword = userData;
    let saltRound = process.env.SALTROUND
    try {
        let hashedpassword = await bcrypt.hash(plainPassword,saltRound);
        return hashedpassword;
    } catch (error) {
        console.log(error)
        return 500
    }
}

export async function isHashedPasswordMatch(userPassword,databasePassword) {
    try {
        if(await bcrypt.compare(userPassword, databasePassword)) {
            return true
        } else {
            return false
        } 
    } catch (error) {
        console.log(error)
        return 500
    }
}