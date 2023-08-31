import { JSEncrypt } from 'jsencrypt'

export function encryptedData (publicKey, password){
    const encryptor = new JSEncrypt()
    encryptor.setPublicKey(publicKey)
    return encryptor.encrypt(password + '')
}