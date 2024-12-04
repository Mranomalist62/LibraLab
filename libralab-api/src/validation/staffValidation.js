import Joi from 'joi';
import * as model from '../model/staffModel.js';

export async function isStaffnameAvailable(staffData) {
  try {
    if (staffData.nama_staff !== '') {
      const row = await model.getStaffByNameDb(staffData.nama_staff);
      if (row.length === 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.log(error, '\n');
    return error;
  }
}

export async function isEmailAvailable(staffData) {
  try {
    if (staffData.email_staff !== '') {
      const row = await model.getStaffByEmailDb(staffData.email_staff);

      if (row === null) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.log(error, '\n');
    return error;
  }
}

export function isDataStaffPostExist(staffData) {
  const schema = Joi.object({
    nama_staff: Joi.string().required(),
    password_staff: Joi.string().required(),
    email_staff: Joi.string().email().required(),
  });

  try {
    let isValid = new Promise((resolve, reject) => {
      let isNothingRequiredEmpty = schema.validate(staffData);
      if (isNothingRequiredEmpty) {
        resolve(staffData);
      } else {
        reject(staffData);
      }
    });

    isValid
      .then((result) => {
        return true;
      })
      .catch((result) => {
        return false;
      });
  } catch (error) {
    console.log(error, '\n');
    return error;
  }
}

export function isDataStaffPutExist(staffData) {
  const schema = Joi.object({
    nama_staff: Joi.string().optional(),
    password_staff: Joi.string().optional(),
    email_staff: Joi.string().email().optional(),
    ID_Jobdesk: Joi.string().optional(),
  });

  try {
    let isValid = new Promise((resolve, reject) => {
      let isNothingRequiredEmpty = schema.validate(staffData);
      if (isNothingRequiredEmpty) {
        resolve(staffData);
      } else {
        reject(staffData);
      }
    });

    isValid
      .then((result) => {
        return true;
      })
      .catch((result) => {
        return false;
      });
  } catch (error) {
    console.log(error, '\n');
    return error;
  }
}

export async function isDataSignUpExist(staffData) {
  console.log(staffData);
  const schema = Joi.object({
    nama_staff: Joi.string().required(),
    password_staff: Joi.string().required(),
    email_staff: Joi.string().email().required(),
    ID_Jobdesk: Joi.string().required(),
  });

  try {
    const { error } = schema.validate(staffData);

    if (error) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error, '\n');
    return false;
  }
}

export function isDataLoginExist(staffData) {
  const schema = Joi.object({
    password_staff: Joi.string().required(),
    email_staff: Joi.string().email().required(),
  });

  const { error } = schema.validate(staffData);

  if (error) {
    console.log(error, '\n');
    return false;
  } else {
    return true;
  }
}
