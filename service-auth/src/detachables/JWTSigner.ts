import jwt from 'jsonwebtoken';
import { Signer } from '../entities/Signer';
import { IParcel } from '../shared/Parcel';
import { IToken } from '../entities/Token';

export class JWTSigner implements Signer {
  private options: object;
  constructor() {
    // Signing options
    this.options = { algorithm: 'RS256' };
  }
  signToken(payload: any, key: string): string {
    try {
      // Return signed payload as JSON Web Token
      return jwt.sign(payload, key, this.options);
    } catch {
      // Payload signing failed
      throw new Error('Module unable to sign payload');
    }
  }
  verifyToken(token: string, key: string): IToken {
    try {
      // Verify token and extract payload
      const payload = jwt.verify(token, key, this.options);
      // Return verified token
      return payload;
    } catch {
      // Token verification failed
      throw new Error('Module unable to verify token');
    }
  }
}
