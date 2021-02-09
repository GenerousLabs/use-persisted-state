import createStorage from '../utils/create-web-storage'

const storage =
  typeof sessionStorage !== 'undefined' ? sessionStorage : undefined

export default createStorage(storage)
