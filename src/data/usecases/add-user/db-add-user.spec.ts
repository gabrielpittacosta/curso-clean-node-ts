import { DbAddUser } from './db-add-user'
import { Encrypter } from '../../protocol/encrypter'

interface SutTypes {
  sut: DbAddUser
  encrypterStub: Encrypter
}

const 

const makeSut = (): SutTypes => {
  class EncrypterStub {
    async encrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('hashed_password'))
    }
  }
  const encrypterStub = new EncrypterStub()
  const sut = new DbAddUser(encrypterStub)

  return {
    sut,
    encrypterStub
  }
}

describe('DbAddUser UseCase', () => {
  test('Should call Encrypt with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const userData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    await sut.add(userData)

    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
