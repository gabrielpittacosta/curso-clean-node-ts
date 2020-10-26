import { HttpRequest, HttpResponse } from '../protocol/http'

export class SignupController {
  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      if (!httpRequest.body.name) {
        return {
          statusCode: 400,
          body: new Error('Missing param: name')
        }
      }
      if (!httpRequest.body.email) {
        return {
          statusCode: 400,
          body: new Error('Missing param: email')
        }
      }

      return {
        statusCode: 200,
        body: 1
      }
    } catch (e) {
      return {
        statusCode: 500,
        body: 'Server error'
      }
    }
  }
}
