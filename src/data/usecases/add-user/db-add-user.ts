import { AddUser, AddUserModel } from '../../../domain/usecases/add-user'
import { User } from '../../../domain/models/user'
import { Encrypter } from '../../protocol/encrypter'

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
