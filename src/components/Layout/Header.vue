<template>
  <header :class="['header', { scrolled: isScrolled }]">
    <div class="header-inner">
      <!-- 左侧 Logo -->
      <div class="header-left clickable" @click="goTo('/home')">
        <img :src="logo" class="nav-logo" />
        <span class="logo-text">番茄小说网</span>
      </div>

      <!-- 中间导航 -->
      <nav class="nav-list">
        <span
          v-for="item in props.menus"
          :key="item.path"
          :class="['nav-item', { active: isActive(item.path) }]"
          @click="goTo(item.path)"
        >
          {{ item.label }}
        </span>
      </nav>

      <!-- 右侧区域 -->
      <div class="header-right">
        <el-input
          v-model="searchText"
          placeholder="请输入书名或作者名"
          :class="['search-input', { 'scrolled-input': isScrolled }]"
          clearable
          @keyup.enter.native="handleSearch"
        >
          <template #suffix>
            <el-icon>
              <Search />
            </el-icon>
          </template>
        </el-input>

        <span class="divider">|</span>

        <div class="auth-links" v-if="!userStore.isLogin">
          <span class="auth-link" @click="goTo('/login')">登录</span>
          <span class="auth-link" @click="goTo('/login')">注册</span>
        </div>

        <div class="auth-dropdown" v-else @mouseenter="showDropdown" @mouseleave="hideDropdown">
          <div class="auth-avatar">
            <img :src="userStore.user?.avatar || defaultAvatar" class="avatar" />
            <span class="auth-username">{{ displayName }}</span>
          </div>
          <div class="dropdown-panel" v-show="dropdownVisible">
            <div class="dropdown-item" @click="goTo('/profile')">
              <img :src="iconUpdate" class="dropdown-icon" />
              <span>修改信息</span>
            </div>
            <div class="dropdown-item" @click="handleLogout">
              <img :src="iconLogout" class="dropdown-icon" />
              <span>退出登录</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'
import { useGoTo } from '@/composables/useGoTo'
import { Search } from '@element-plus/icons-vue'

const { goTo } = useGoTo()
const route = useRoute()
const searchText = ref('')
const userStore = useUserStore()
const props = defineProps<{
  menus: { path: string; label: string }[]
}>()

const logo = new URL('@/assets/icons/logo/icons8-firebase-undefined-32.png', import.meta.url).href
const defaultAvatar = new URL(
  '@/assets/icons/Profile/icons8-user-pulsar-color-32.png',
  import.meta.url
).href
const iconUpdate = new URL(
  '@/assets/icons/update/icons8-update-windows-11-outline-32.png',
  import.meta.url
).href
const iconLogout = new URL(
  '@/assets/icons/logout/icons8-logout-windows-11-filled-32.png',
  import.meta.url
).href

const isActive = (path: string) => route.path === path

const handleLogout = () => {
  userStore.logout()
  goTo('/login')
}

const displayName = computed(() => {
  if (userStore.user?.nickname?.trim()) return userStore.user.nickname
  return userStore.user?.id?.toString().slice(0, 3) || '用户'
})

const dropdownVisible = ref(false)
let timer: number | null = null

const showDropdown = () => {
  if (timer) clearTimeout(timer)
  dropdownVisible.value = true
}
const hideDropdown = () => {
  timer = window.setTimeout(() => {
    dropdownVisible.value = false
  }, 300)
}

const isScrolled = ref(false)
const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

const handleSearch = () => {
  const keyword = searchText.value.trim()
  if (!keyword) return
  goTo(`/search?keyword=${encodeURIComponent(keyword)}`)
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onBeforeUnmount(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background: transparent;
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease;
}

.header.scrolled {
  background: #fff;
  box-shadow: 0 1px 0 #e0e0e0;
}

.header-inner {
  width: 1240px;
  margin: 0 auto;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* 左侧 LOGO */
.header-left {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.nav-logo {
  width: 28px;
  height: 28px;
  margin-right: 6px;
}

.logo-text {
  font-size: 18px;
  color: #222;
}

/* 中间导航栏 */
.nav-list {
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 68px;
  white-space: nowrap;
  margin-left: 235px;
}

.nav-item {
  font-size: 14px;
  color: #222;
  position: relative;
  cursor: pointer;
  padding: 4px 0;
}

.nav-item.active {
  color: #000;
  font-weight: bold;
}

.nav-item:hover::after {
  width: 100%;
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background-color: #222;
  transition: width 0.3s ease;
}

/* 右侧区域 */
.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  margin-left: auto;
}

.search-input {
  width: 180px;
  height: 28px;
  border-radius: 999px;
  background: #fff;
  transition: all 0.3s ease;
}

.search-input.scrolled-input {
  background: #f5f5f5;
}

.search-input :deep(.el-input__wrapper) {
  height: 32px;
  padding: 0 10px;
  background-color: transparent;
  border-radius: 999px;
  border: none;
  box-shadow: none;
  display: flex;
  align-items: center;
}

.search-input :deep(.el-input__inner) {
  height: 32px;
  line-height: 32px;
  font-size: 12px;
  padding: 0;
  background-color: transparent;
  border: none;
  box-shadow: none;
  color: #333;
  display: flex;
  align-items: center;
}

.divider {
  color: #ccc;
  margin: 0 12px;
  font-size: 14px;
  user-select: none;
  line-height: 1;
}

.auth-links {
  display: flex;
  align-items: center;
  gap: 30px;
  font-size: 14px;
  color: #222;
}

.auth-link:hover {
  color: #f85959;
  cursor: pointer;
}

.auth-dropdown {
  position: relative;
}

.auth-avatar {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
}

.auth-username {
  font-size: 14px;
  color: #222;
}

.dropdown-panel {
  position: absolute;
  top: 36px;
  right: 0;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 6px 0;
  min-width: 140px;
  z-index: 999;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 8px 24px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: #f7f7f7;
}

.dropdown-icon {
  width: 16px;
  height: 16px;
  margin-right: 8px;
  object-fit: contain;
}
</style>
