//简单写下，未整理
export const debounce = (fun, time) => {}
export const throttle = (fun, time = 200) => {
  let valid = true
  return () => {
    if (!valid) {
      return false
    }
    valid = false
    setTimeout(() => {
      console.log(1)
      fun()
      valid = true
    }, 1000)
  }
}
