export default ($cookies) => {
  const loginRedirect = $cookies.get('loginRedirect')
  if (loginRedirect) $cookies.remove('loginRedirect')
  window.location = (loginRedirect || '/')
}
