import { RecordInteractor } from '../entities/RecordInteractor';
import { RequestHTTP } from '../shared/RequestHTTP';
import { ResponseHTTP } from '../shared/ResponseHTTP';

export class Controller {
  private recordInteractor: RecordInteractor;

  constructor(injectedInteractor: RecordInteractor) {
    // Injected Interactor
    this.recordInteractor = injectedInteractor;
  }

  async route(request: RequestHTTP): Promise<ResponseHTTP> {
    try {
      // Route request based on method
      switch (request.method.toUpperCase()) {
        case 'GET':
          // Check missing data
          if (!request.queryParams) {
            // Missing required data
            throw new Error('Missing query parameters');
          }
          // Execute Read operation and return response
          return await this.recordInteractor.fetchRecords(request.queryParams);

        case 'POST':
          // Check missing data
          if (!request.body) {
            // Missing required data
            throw new Error('Missing request body');
          }
          // Execute Create operation and return response
          return await this.recordInteractor.createRecords(request.body);

        case 'PUT':
          // Check missing data
          if (!request.body) {
            // Missing required data
            throw new Error('Missing request body');
          }
          // Execute Update operation and return response
          return await this.recordInteractor.updateRecords(request.body);

        case 'DELETE':
          // Check missing data
          if (!request.queryParams) {
            // Missing required data
            throw new Error('Missing query parameters');
          }
          // Execute Delete operation and return response
          return await this.recordInteractor.deleteRecords(request.queryParams);

        default:
          // Request method out of scope
          throw new Error('Invalid request method');
      }
    } catch (error) {
      // Return error response from Controller
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: {
          isError: true,
          description: 'Error message',
          payload: (error as Error).message,
        },
      };
    }
  }
}
