import * as bcrypt  from 'bcrypt'

export async function hashPassword(userData) {
    let plainPassword = userData;
    let saltRound = "$2a$10$zW2I0M5U.tTZw62Hf6TgDeP7rTpV3JZzO3otdCeohUq9BZgyzHTZG"
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