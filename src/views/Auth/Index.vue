<template>
  <!-- 顶部导航 -->
  <div class="top-nav">
    <div class="nav-left" @click="goTo('/home')">
      <img :src="logo" class="nav-logo" />
      番茄小说网
      <span class="divider">|</span>
      <span class="nav-item-left" @click.stop="goTo('/writer')">作家专区</span>
    </div>
    <div class="nav-right">
      <span class="nav-item-right" @click="goTo('/home')">游客登录</span>
      <span class="nav-item-right" @click="goTo('/benefit')">作家福利</span>
    </div>
  </div>

  <!-- 页面内容 -->
  <div class="login-page">
    <!-- 懒加载封面 + 背景视频 -->
    <img v-if="!videoLoaded" class="video-placeholder" :src="poster" alt="背景加载中..." />
    <video
      v-show="videoLoaded"
      autoplay
      muted
      loop
      playsinline
      class="bg-video"
      @canplaythrough="videoLoaded = true"
    >
      <source :src="videoSrc" type="video/webm" />
    </video>

    <!-- 遮罩 -->
    <div class="overlay"></div>

    <!-- 登录表单区域 -->
    <div class="login-panel">
      <div class="login-box">
        <router-view />
      </div>
    </div>
  </div>

  <!-- 页脚 -->
  <div class="footer-text">©2025 番茄小说网 | 本系统仅供学习与教学使用</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useGoTo } from '@/composables/useGoTo'

const { goTo } = useGoTo()
const videoLoaded = ref(false)

const poster = new URL('@/assets/images/auth/welcome.webp', import.meta.url).href
const videoSrc = new URL('@/assets/movies/auth/welcome.webm', import.meta.url).href
const logo = new URL('@/assets/icons/logo/icons8-firebase-undefined-32.png', import.meta.url).href
</script>

<style scoped>
.top-nav {
  position: absolute;
  top: 20px;
  left: 0;
  width: 100%;
  z-index: 3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20%;
  font-size: 14px;
  font-weight: 500;
  color: white;
  pointer-events: none;
}

.nav-left {
  font-size: 18px;
  line-height: 1;
  height: 24px;
  display: flex;
  align-items: center;
  pointer-events: auto;
  cursor: pointer;
}

.nav-right {
  display: flex;
  gap: 24px;
  pointer-events: auto;
}

.nav-item-left,
.nav-item-right {
  cursor: pointer;
  transition: color 0.2s ease;
  font-size: 14px;
}

.nav-item-right:hover {
  color: #ff8140;
}

.nav-logo {
  width: 26px;
  margin-right: 8px;
  object-fit: contain;
}

.login-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.bg-video,
.video-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  z-index: 1;
}

.login-panel {
  position: absolute;
  top: 50%;
  right: 100px;
  transform: translateY(-50%);
  z-index: 2;
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.login-box {
  width: 400px;
  padding: 40px 32px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.footer-text {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  z-index: 2;
}

.divider {
  margin: 0 8px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  user-select: none;
  font-weight: normal;
}
</style>
