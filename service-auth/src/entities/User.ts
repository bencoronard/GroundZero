import { IAuthorization } from './Authorization';

export interface Identity {
  identifier: string; // i.e. username
  passphrase: string; // i.e. password
}

export interface IUser {
  credentials: Identity;
  permissions: IAuthorization;
  lastAuthenticated: number;
}

export class User {
  static parseCredentials(input: { [key: string]: string }): Identity {
    try {
      // Initialize empty credential object
      const parsedCredentials: Identity = { identifier: '', passphrase: '' };
      // Check for missing inputs
      if (input.identifier && input.passphrase) {
        // Parse input identifier
        parsedCredentials.identifier = input.identifier.toString();
        // Parse input passphrase
        parsedCredentials.passphrase = input.passphrase.toString();
      } else {
        // Missing one or more input data
        throw new Error('Incomplete input credentials');
      }
      // Return parsed credentials
      return parsedCredentials;
    } catch (error) {
      // Propagate errors thrown during credential parsing
      throw error;
    }
  }
  static flatten(input: IUser) {
    // Flatten user object for storage
    return {
      ...input.credentials,
      permissions: input.permissions,
      lastAuthenticated: input.lastAuthenticated,
    };
  }
}
