import { supabase } from '../../lib/supabase.js'
import { USER_ROLES } from './roles.js'

export async function getCurrentUserProfile() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError) {
    throw userError
  }

  if (!user) {
    return null
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error && error.code !== 'PGRST116') {
    throw error
  }

  return data
}

export async function getUserRole() {
  const profile = await getCurrentUserProfile()
  return profile?.role ?? null
}

export async function requireOwnerRole() {
  const role = await getUserRole()

  if (role !== USER_ROLES.OWNER) {
    throw new Error('Owner access required.')
  }

  return role
}
