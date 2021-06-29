import * as constants from '../constants'

// 初始默认的state
let isLoginModalVisible = window.localStorage.userInfo ? false : true

const reducer =  (state = isLoginModalVisible, action) => {
    // 由于state是引用型，不能直接修改，否则是监测不到state发生变化的。因此需要先复制一份进行修改，然后再返回新的state。
    // let newState = Object.assign({}, state)
    switch(action.type) {
        case constants.SET_MODAL_TRUE:
            isLoginModalVisible = true
            return isLoginModalVisible
        case constants.SET_MODAL_FALSE:
            isLoginModalVisible = false
            return isLoginModalVisible
        default:
            return state
    }
}

export default reducer
