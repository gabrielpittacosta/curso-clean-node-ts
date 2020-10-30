import { AddUser, AddUserModel, User, Encrypter } from './db-add-user-protocols'

export class DbAddUser implements AddUser {
  private readonly encrypter: Encrypter

  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (user: AddUserModel): Promise<User> {
    await this.encrypter.encrypt(user.password)

    // @ts-expect-error
    return await new Promise(resolve => resolve(null))
  }
}
