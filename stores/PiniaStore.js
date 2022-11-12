export const usePiniaStore = defineStore('PiniaStore', () => {
  const authenticated = ref(false)
  const userCreated = ref("")

  return {
    authenticated,
    userCreated
  }
})