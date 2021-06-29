import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import loginReducer from './reducers/login'
import modifyLoginModalReducer from './reducers/modifyLoginModal'
import thunk from 'redux-thunk'

// 这里让项目支持浏览器插件Redux DevTools
const composeEnhancers = typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

const enhancer = composeEnhancers(
    applyMiddleware(thunk)
);

const store = createStore(
    combineReducers({ userInfo: loginReducer, isLoginModalVisible: modifyLoginModalReducer }),
    enhancer
)

export default store
