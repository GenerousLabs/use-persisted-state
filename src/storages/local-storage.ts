import createStorage from '../utils/create-web-storage'

const storage = typeof localStorage !== 'undefined' ? localStorage : undefined

export default createStorage(storage)
