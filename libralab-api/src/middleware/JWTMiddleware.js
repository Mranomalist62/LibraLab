import * as jwt from 'jsonwebtoken'

export async function generateJWT(userData){
    const payload = {
        ID_User         : userData.ID_user,
        ID_Provinsi     : userData.ID_Provinsi,
        ID_Kabupaten    : userData.ID_Kabupaten,
        Ket_alamat      : userData.Ket_alamat,
        notel_user      : userData.notel_user,
        norek_user      : userData.norek_user,
        email_user      : userData.email_user,
    };

    try {
        jwtSecret = process.env.JWTSECRET;
        jwtExpiration = process.env.JWTEXPIRATION;
        const token = jwt.sign(payload,jwtSecret,{expiresIn : jwtExpiration})
        return token;

    } catch (error) {
        console.log(error)
        return 500
        
    }
}

export async function isJWTValid(authHeader){
    try {

        if (!authHeader || !authHeader.startsWith('Bearer')){
            return 401
        }
        
        const token = authHeader.split(' ')[1];
        if(!token) {
            return 401
        }

        else {
            jwtSecret = process.env.JWTSECRET;
            jwt.verify(token, jwtSecret);
            return true
        }
    } catch (error) {
        return 403
    }
}

