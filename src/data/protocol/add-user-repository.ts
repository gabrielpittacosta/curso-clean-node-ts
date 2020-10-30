import { AddUserModel } from '../../domain/usecases/add-user'
import { User } from '../../domain/models/user'

export interface AddUserRepository {
  add: (userData: AddUserModel) => Promise<User>
}
