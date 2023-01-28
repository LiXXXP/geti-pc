import Cookies from 'js-cookie'

const TokenKey = 'accessToken'
const UserId = 'userId'

export function getToken(): string | undefined {
  return Cookies.get(TokenKey)
}

export function setToken(token: string): string | undefined {
  return Cookies.set(TokenKey, token)
}

export function removeToken(): void {
  return Cookies.remove(TokenKey)
}

export function getUserId(): string | undefined {
  return Cookies.get(UserId)
}

export function setUserId(userId: string): string | undefined {
  return Cookies.set(UserId, userId)
}

export function getEntityId(): string | undefined {
  return Cookies.get('entityId')
}
