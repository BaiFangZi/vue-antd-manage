// import { cosh } from 'core-js/fn/number'
import { isEmpty, isArray } from 'lodash'

export function formatMenu(data) {
  const result = []
  data.forEach((item) => {
    const obj = {
      icon: item.meta.icon,
      title: item.meta.title,
      path: item.path,
    }
    if (item.children && item.children.length) {
      result.push({
        ...obj,
        children: formatMenu(item.children),
      })
    } else {
      result.push(obj)
    }
  })
  return result
}
