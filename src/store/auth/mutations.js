import router from '@/router'

export const setAuth = (state, payload) => {
  state.auth = { ...state.auth, ...payload }
}

export const logout = (state) => {
  state.auth = {}
}

export const toggleTutorial = (state, payload) => {
  state.showTutorial = payload
}

export const toggleBlur = (state, payload) => {
  state.showBlur = payload
}

export const toggleSignupModal = (state, payload) => {
  state.showSignupModal = payload
}

export const setSubscriptionModal = (state, payload) => {
  state.isShowSubscriptionModal = payload.status
  state.dateCount = payload.date
}

export const setTempAuth = (state, payload) => {
  state.tempAuth = payload
}

export const setBusinessStates = (state, payload) => {
  state.showTutorial = payload?.showTutorial
  state.showBlur = payload?.showBlur
  state.showSignupModal = payload?.showSignupModal
  if (payload?.removeLocal) {
    localStorage.removeItem('vjt-FirstTour')
  }
}

export const setAuthStatus = (state, payload) => {
  state.isLoading = payload?.loading
  state.isError = payload?.error
  state.isSuccess = payload?.success
}

export const setAuthRequestStatus = (state, payload) => {
  state.isReqLoading = payload?.loading
  state.isReqError = payload?.error
  state.isReqSuccess = payload?.success
}

export const checkAuth = (state, payload) => {
  if (!state.auth.token) {
    router.push({ name: 'home' })
  }
}
