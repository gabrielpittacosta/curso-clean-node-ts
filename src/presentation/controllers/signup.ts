import { HttpRequest, HttpResponse } from '../protocol/http'
import { MissingParamError } from '../errors/missing-param-error'

export class SignupController {
  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      if (!httpRequest.body.name) {
        return {
          statusCode: 400,
          body: new MissingParamError('name')
        }
      }
      if (!httpRequest.body.email) {
        return {
          statusCode: 400,
          body: new MissingParamError('email')
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
