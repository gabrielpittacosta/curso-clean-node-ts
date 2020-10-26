import { HttpRequest, HttpResponse } from '../protocol/http'
import { InvalidParamError, MissingParamError } from '../errors/param-error'
import { badRequest } from '../helper/http-helper'
import { Controller } from '../protocol/controller'
import { EmailValidator } from '../protocol/email-validator'

export class SignupController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      return {
        statusCode: 200,
        body: 'pass'
      }
    } catch (e) {
      return {
        statusCode: 500,
        body: 'Server error'
      }
    }
  }
}
