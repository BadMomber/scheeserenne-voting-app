export const hasRole = (user, role) => {
  // default role is 'guest'
  if (!user) {
    return role === "guest"
  }

  return (
    // admin has every role
    user.role === "admin" ||
    // user also has guest role
    user.role === "guest" ||
    user.role === role
  )
}
