import { defineStore } from 'pinia'

interface UserInfo {
  id: number
  nickname: string
  role: 'user' | 'guest' | 'author' | 'admin'
  token?: string
  avatar?: string
  become_author_at?: string | null
  signature?: string | null
  level?: number
}

export const useUserStore = defineStore('user', {
  state: (): {
    user: UserInfo | null
  } => ({
    user: null
  }),

  getters: {
    id: state => state.user?.id || 0,
    isLogin: state => !!state.user,
    nickname: state => state.user?.nickname || '',
    role: state => state.user?.role || 'guest',
    isAdmin: state => state.user?.role === 'admin',
    isAuthor: state => state.user?.role === 'author',
    daysAsAuthor: state => {
      if (!state.user?.become_author_at) return 0
      const begin = new Date(state.user.become_author_at).getTime()
      const now = Date.now()
      return Math.ceil((now - begin) / (1000 * 60 * 60 * 24))
    },
    avatar: state => state.user?.avatar,
    signature: state => state.user?.signature || '',
    level: state => state.user?.level || 0
  },

  actions: {
    setUser(user: UserInfo) {
      this.user = { ...user }
      localStorage.setItem('user', JSON.stringify(this.user))
    },

    loadUserFromStorage() {
      const raw = localStorage.getItem('user')
      if (raw) {
        this.user = JSON.parse(raw)
      }
    },

    logout() {
      this.user = null
      localStorage.removeItem('user')
    }
  }
})
