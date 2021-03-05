export default {
  getToken() {
    return localStorage.getItem('access-token')
  },
  getLang() {
    return localStorage.getItem('lang')
  },
}
