import jwt from 'jsonwebtoken';

export async function generateJWTUser(userData) {
  const payload = {
    ID_User: userData.ID_User,
    Nama_user: userData.Nama_user,
    email_user: userData.email_user,
  };

  try {
    const jwtSecret = process.env.JWTSECRET;
    const jwtExpiration = process.env.JWTEXPIRATION;
    const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiration });
    return token;
  } catch (error) {
    console.log(error);
    return 500;
  }
}

export async function generateJWTAuthor(authorData) {
  const payload = {
    ID_Author: authorData.ID_Author,
    nama_author: authorData.Nama_author,
    email_author: authorData.email_author,
  };

  try {
    const jwtSecret = process.env.JWTSECRET;
    const jwtExpiration = process.env.JWTEXPIRATION;
    const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiration });
    return token;
  } catch (error) {
    console.log(error);
    return 500;
  }
}

export async function generateJWTStaff(staffData) {
  const payload = {
    ID_Staff: staffData.ID_Staff,
    nama_staff: staffData.Nama_staff,
    email_staff: staffData.email_staff,
  };

  try {
    const jwtSecret = process.env.JWTSECRET;
    const jwtExpiration = process.env.JWTEXPIRATION;
    const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiration });
    return token;
  } catch (error) {
    console.log(error);
    return 500;
  }
}

export async function isJWTValid(authHeader) {
  try {
    if (!authHeader) {
      return 401;
    } else {
      const jwtSecret = process.env.JWTSECRET;
      const secret = jwt.verify(authHeader, jwtSecret);
      return secret;
    }
  } catch (error) {
    console.log(error);
    return 403;
  }
}
