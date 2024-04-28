import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { CryptoCipher } from './detachables/CryptoCipher';
import { IUser } from './entities/User';

// Generate a new RSA key pair
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
});

const perm = {
  database: { create: false, read: true, update: true, delete: false },
};

const message: string = JSON.stringify(perm);
console.log('Message: ', message);

const cipher = new CryptoCipher();

// (async () => {
//   try {
//     const encryptedText: string = await cipher.encryptText(message, publicKey);
//     console.log('Encrypted: ', encryptedText);
//     const decryptedText: string = await cipher.decryptText(
//       encryptedText,
//       privateKey
//     );
//     console.log('Decrypted: ', decryptedText);

//     // const encryptedText: string = await cipher.encryptText(message, privateKey);
//     // console.log('Encrypted: ', encryptedText);
//     // const decryptedText: string = await cipher.decryptText(
//     //   encryptedText,
//     //   publicKey
//     // );
//     // console.log('Decrypted: ', decryptedText);
//   } catch (error) {
//     console.error('Error: ', (error as Error).message);
//   }
// })();

const user = {
  credentials: { identifier: 'Jake', passphrase: '1234' },
  permissions: message,
};

console.log({ ...user.credentials, permit: user.permissions });
// dotenv.config({ path: path.resolve(__dirname, '.env') });

// const publicKey: string = process.env.PUBLIC_KEY || 'public_key';
// const privateKey: string = process.env.PRIVATE_KEY || 'private_key';

// Sample payload for the JWT token
// const payload = {
//   id: 123,
//   username: 'exampleuser',
// };

// Sign the JWT token using the private key
// const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });
// console.log('JWT Token:', token);

// Verify the JWT token using the public key
// try {
//   const clientToken = jwt.verify(token, publicKey);
//   console.log('JWT Payload:', clientToken);
// } catch {
//   console.log('Token verification failed');
// }
