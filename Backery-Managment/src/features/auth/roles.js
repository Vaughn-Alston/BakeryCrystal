export const USER_ROLES = Object.freeze({
  CUSTOMER: 'customer',
  OWNER: 'owner',
})

export function isOwnerRole(role) {
  return role === USER_ROLES.OWNER
}

export function assertOwnerAccess(role) {
  if (!isOwnerRole(role)) {
    throw new Error('Owner access required.')
  }

  return role
}
