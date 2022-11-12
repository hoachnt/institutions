export const usePiniaStore = defineStore('PiniaStore', () => {
  const authenticated = ref(false)

  return {
    authenticated
  }
})