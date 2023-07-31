export default (path) => (
  [
    /^\/?login\/?/,
    /^\/?logout\/?/,
  ].reduce((isMatch, regexPath) => (
    isMatch ? true : regexPath.test(path)
  ), false)
)
