import { authReducer, authThunks } from './auth.reducer';

let startState = {isLoggedIn: false}

test('isLoggedIn should be TRUE', () => {
  const action = authThunks.login.fulfilled({isLoggedIn: true}, 'requestIds', {email: 'user', password: 'qwerty', rememberMe: true})
  
  const endState = authReducer(startState, action)
  expect(endState.isLoggedIn).toBeTruthy()
})

test('isLoggedIn should be FALSE', () => {
  const action = authThunks.logout.fulfilled({ isLoggedIn: false }, 'requestIds')
  const endState = authReducer(startState, action)
  expect(endState.isLoggedIn).not.toBeTruthy()
})