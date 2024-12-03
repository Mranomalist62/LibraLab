import * as staffModel from '../model/staffModel.js'
import * as staffValidation from '../validation/staffValidation.js'
import * as hashingMiddleware from '../middleware/hashingMiddleware.js';
import * as JWTMiddleware from '../middleware/JWTMiddleware.js'

//Staff SIGN UP & LOGIN FUNCTION
export async function initiateSignUp(req,res){
    const staffData = req.body;
    try {
        if(await staffValidation.isEmailAvailable(staffData)){
            if(await staffValidation.isDataSignUpExist(staffData)){
                
    
                staffData.password_staff = await hashingMiddleware.hashPassword(staffData.password_staff);
                const SignUpStatus = await staffModel.postStaffDb(staffData);
                if (SignUpStatus === 503 || SignUpStatus === null){
                    res.status(500).json({message: 'Query Error'});
                } else {
                    res.status(200).json({message: 'Sign in successfull', status : 200})
                }


            } else {
                res.status(400).json({message: 'required information is missing'});
            }
        }
        else{
            res.status(400).json({message: 'Email has been used'});
        }
    } catch (error) {
        console.log(error,'\n');
        res.status(500).json({message: 'Error creating staff', error});
        return 
    }
}


export async function loginStaff(req,res){
    const staffData = req.body;
    try {
        if(await staffValidation.isDataLoginExist(staffData)){
            const result = await staffModel.getStaffByEmailDb(staffData.email_staff)
            if(result !== null)
            {
                if(await hashingMiddleware.isHashedPasswordMatch(staffData.password_staff,result.password_staff))
                {
                    const token = await JWTMiddleware.generateJWTStaff(result)
                    if (token === 500)
                    {
                        res.status(500).json({message: 'Cannot Generating Token'});
                        
                    } else {
                        res.cookie('jwt',token,{
                            httpOnly : true,
                            secure: false , // Use only over HTTPS
                            sameSite: 'Lax',
                            maxAge: 12 * 60 * 60 * 1000
                        });
                        res.status(200).json({message: 'Credential confirmed, Login success'})   
                    }

                } else {
                    res.status(400).json({message: 'Wrong Credential, login failed'});
                }

            } else {
                res.status(404).json({message: 'Staff not found'});
            }
        } else {
            res.status(400).json({message: 'required information is missing'});
        }
    } catch (error) {
        console.log(error,'\n');
        res.status(500).json({message: 'Error verifying credential', error});
        return 
    }
}

