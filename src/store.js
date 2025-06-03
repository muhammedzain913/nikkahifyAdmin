// import { legacy_createStore as createStore } from 'redux'

// const initialState = {
//   sidebarShow: true,
//   theme: 'light',
// }

// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case 'set':
//       return { ...state, ...rest }
//     default:
//       return state
//   }
// }

// const store = createStore(changeState)
// export default store

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from '../src/Redux/Slices/userSlice'
import styleReducer from '../src/Redux/Slices/styleSlice'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import { version } from 'core-js'

const rootReducer = combineReducers({
  user: userReducer,
  style: styleReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({
      serializableCheck: false,
      immutableCheck: false,
    }),
})

const persistor = persistStore(store)

export { store, persistor }
