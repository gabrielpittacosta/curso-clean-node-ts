import { DbAddUser } from './db-add-user'
import { Encrypter } from '../../protocol/encrypter'

interface SutTypes {
  sut: DbAddUser
  encrypterStub: Encrypter
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return await new Promise(resolve => resolve('hashed_password'))
    }
  }

  return new EncrypterStub()
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
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
