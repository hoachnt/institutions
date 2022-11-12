export const usePiniaStore = defineStore('PiniaStore', () => {
  const authenticated = ref(false)
  const userCreated = ref("")
  const token = ref("")

  return {
    authenticated,
    userCreated,
    token
  }
})