import { AddUser, AddUserModel, User, Encrypter, AddUserRepository } from './db-add-user-protocols'

export class DbAddUser implements AddUser {
  private readonly encrypter: Encrypter
  private readonly addUserRepository: AddUserRepository

  constructor (encrypter: Encrypter, addUserRepository: AddUserRepository) {
    this.encrypter = encrypter
    this.addUserRepository = addUserRepository
  }

  async add (user: AddUserModel): Promise<User> {
    const hashedPassword = await this.encrypter.encrypt(user.password)

    return await this.addUserRepository.add(Object.assign({}, user, { password: hashedPassword }))
  }
}
