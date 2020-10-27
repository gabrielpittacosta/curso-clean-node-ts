import { HttpRequest, HttpResponse, Controller, EmailValidator, AddUser } from './signup-protocols'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helper/http-helper'

export class SignupController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addUser: AddUser

  constructor (emailValidator: EmailValidator, addUser: AddUser) {
    this.emailValidator = emailValidator
    this.addUser = addUser
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const { name, email, password, passwordConfirmation } = httpRequest.body
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      const isValid = this.emailValidator.isValid(email)

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      if (passwordConfirmation !== password) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      this.addUser.add({ name, email, password })

      return {
        statusCode: 200,
        body: 'pass'
      }
    } catch (error) {
      return serverError()
    }
  }
}
