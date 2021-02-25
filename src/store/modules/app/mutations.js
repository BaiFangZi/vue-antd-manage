import state from './state'
export default {
  SET_TOKEN(state, token) {
    state.token = token
    console.log(token)
    localStorage.setItem('access-token', token)
  },
  CLEAR_TOKEN(state) {
    state.token = ''
    if (!!localStorage.getItem('access-token')) {
      localStorage.removeItem('access-token')
    }
  },
}
