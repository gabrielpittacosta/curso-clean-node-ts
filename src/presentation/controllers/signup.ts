import { HttpRequest, HttpResponse } from '../protocol/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helper/http-helper'
import { Controller } from '../protocol/controller'

export class SignupController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
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
