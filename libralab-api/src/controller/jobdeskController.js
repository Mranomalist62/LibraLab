import * as jobdeskModel from '../model/jobdeskModel.js'
import * as jwtMiddleware from '../middleware/JWTMiddleware.js'

export async function getJobdeskAll(req,res){
    
    try {
        const authHeader = req.headers['authorization'];
        console.log(authHeader);
        const Token = await jwtMiddleware.isJWTValid(authHeader);

        if(Token === 403){
            res.status(403).json({message: 'Token expire or has been tampered'});
            return
        }
        else if(Token === 401){
            res.status(401).json({message: 'Token is missing'});
            return
        } 

        const result = await jobdeskModel.getJobdeskAllDb();
    
        if(!result){
            res.status(404).json({message: 'no Book in database for this author'});
            return
        }

        if(result===503){
            res.status(503).json({message: 'Error sending book Information'});
            return
        }

            res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
        console.log(error);
    }
}