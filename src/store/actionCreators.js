import * as constans from './constants'

export const setUserInfo = (data) => ({
  type: constans.LOGIN,
  data
})

export const setLoginModalTrue = () => ({
  type: constans.SET_MODAL_TRUE
})
export const setLoginModalFalse = () => ({
  type: constans.SET_MODAL_FALSE
})