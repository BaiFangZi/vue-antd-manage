import { findIndex } from 'lodash'
const excludeTags = ['/dashboard', '/login', '/']

export default {
  SET_ROUTER_TAGS(state, route) {
    // console.log(route)
    const { fullPath, path, meta } = route
    if (!excludeTags.includes(path)) {
      if (state.keepLiveTags.some((i) => i.fullPath === route.fullPath))
        return false
      state.keepLiveTags.push({
        title: meta.title,
        fullPath,
        path,
      })
    }
  },
  DELETE_ROUTE_TAGS(state, route) {
    // console.log(state.keepLiveTags)
    // console.log(route)
    const index = findIndex(state.keepLiveTags, route)
    // console.log(index)
    if (index === -1) return false
    state.keepLiveTags.splice(index, 1)
  },
}
