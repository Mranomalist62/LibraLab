import 'dotenv/config';
import { deleteBookDb, getbookByIdDb } from './/src/model/bookModel.js'; // adjust imports based on your file structure

// Decode the header and payload
const str = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRF9BdXRob3IiOjEsImVtYWlsX2F1dGhvciI6Im1hcmlvZmlyZGF1czQ1NkBnbWFpbC5jb20iLCJpYXQiOjE3MzI2Mjk0MDMsImV4cCI6MTczMjcxNTgwM30.DHYvLtdYF9j_UTUB4K0jAz9QWuTBXKsJ3F-byD8YvbI'

const decodeBase64Url = (str) => {
    // Replace characters for Base64 URL decoding
    return atob(str.replace(/-/g, '+').replace(/_/g, '/'));
  };
 
  // Decode header and payload
  const decodedHeader = decodeBase64Url(parts[0]);
  const decodedPayload = decodeBase64Url(parts[1]);
 
  // Parse them into JSON objects
  const header = JSON.parse(decodedHeader);
  const payload = JSON.parse(decodedPayload);
 
  console.log('Header:', header);
  console.log('Payload:', payload);