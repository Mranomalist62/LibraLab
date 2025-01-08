// transactionController.js
import * as transactionModel from '../model/transactionModel.js';
import * as jwtMiddleware from '../middleware/JWTMiddleware.js';
import * as path from 'path';
import fs from 'fs';


export async function getTransactionByAuthorID(req, res) {
    try {
        const authHeader = req.cookies.jwt;
        const Token = await jwtMiddleware.isJWTValid(authHeader);

        if (Token === 403) {
            res.status(403).json({
                message: 'Token expired or has been tampered',
            });
            return;
        } else if (Token === 401) {
            res.status(401).json({
                message: 'Token is missing',
            });
            return;
        }

        // Use the ID_Author from the Token to fetch the transactions
        const authorId = Token.ID_Author;
        const transactions = await transactionModel.getTransactionByAuthorIdDb(authorId);

        if (!transactions || transactions === 503) {
            res.status(500).json({
                message: 'Error retrieving transaction data',
            });
            return;
        }

        // Check if no transactions were found
        if (transactions.length === 0) {
            res.status(404).json({
                message: 'No transactions found for this user',
            });
            return;
        }

        res.status(200).json({
            message: 'Transactions retrieved successfully',
            data: transactions, // Return the transactions array
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
        });
        console.log(error);
    }
}


export async function getTransactionUnconfirmedByAuthorID(req, res) {
    try {
        const authHeader = req.cookies.jwt;
        const Token = await jwtMiddleware.isJWTValid(authHeader);

        if (Token === 403) {
            res.status(403).json({
                message: 'Token expired or has been tampered',
            });
            return;
        } else if (Token === 401) {
            res.status(401).json({
                message: 'Token is missing',
            });
            return;
        }

        // Use the ID_Author from the Token to fetch the transactions
        const authorId = Token.ID_Author;
        const transactions = await transactionModel.getTransactionUnconfirmedByAuthorIdDb(authorId);

        if (!transactions || transactions === 503) {
            res.status(500).json({
                message: 'Error retrieving transaction data',
            });
            return;
        }

        // Check if no transactions were found
        if (transactions.length === 0) {
            res.status(404).json({
                message: 'No transactions found for this user',
            });
            return;
        }

        res.status(200).json({
            message: 'Transactions retrieved successfully',
            data: transactions
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
        });
        console.log(error);
    }
}

export async function postTransaction(req, res) {
    try {
        const authHeader = req.cookies.jwt;
        const Token = await jwtMiddleware.isJWTValid(authHeader);

        if (Token === 403) {
            res.status(403).json({
                message: 'Token expired or has been tampered',
            });
            return;
        } else if (Token === 401) {
            res.status(401).json({
                message: 'Token is missing',
            });
            return;
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'File upload is required',
            });
        }

        const paymentFile = req.file;

        // Update the ID to be ID_User from the Token
        const transactionData = {
            ...req.body,
            ID_User: Token.ID_User,  
            file_path: paymentFile.filename
        };

        const result = await transactionModel.postTransactionDb(transactionData);

        if (!result || result === 503) {
            // Rollback file update
            const fileFolderPath = path.join(process.cwd(), '/media/file/transaction', paymentFile.filename);
            if (fs.existsSync(fileFolderPath)) {
                await fs.promises.unlink(fileFolderPath);
                console.log(`File deleted: ${fileFolderPath}`);
            }

            res.status(500).json({
                message: 'Error processing transaction information',
            });
            return;
        }

        res.status(200).json({
            message: 'Transaction information successfully processed',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
        });
        console.log(error);
    }
}