<template>
  <div class="author_active">
    <!-- 顶部用户卡片 -->
    <div class="user_card">
      <div class="user-card-left">
        <img :src="displayAvatar" class="user-card-left-avatar" />
        <div class="user-card-left-text">
          <div class="user-card-left-text-hello">{{ greetingText }}</div>
          <div class="user-card-left-text-title">
            <div v-html="greetingDescHtml"></div>
          </div>
        </div>
      </div>

      <div class="user-card-right">
        <!-- 未登录：按钮为“立即登录” -->
        <span v-if="!userStore.isLogin" class="btn1" @click="goTo('/login')">立即登录</span>

        <!-- 登录后显示“工作台” -->
        <span
          v-if="userStore.isLogin"
          class="btn1"
          @click="goTo(userStore.isAuthor ? '/workspace/writer' : '/workspace')"
        >
          工作台
        </span>

        <span @click="goTo('/benefit')">作家福利</span>
      </div>
    </div>

    <!-- 公告列表 -->
    <div class="home-list">
      <!-- 左侧：公告 -->
      <div class="home-notice">
        <div class="home-notice-left">
          <div class="author_list_title">公告</div>
          <img class="author_list_title_icon" :src="iconTit1" alt="tit" />
        </div>

        <div class="home-notice-right">
          <!-- 有图公告 -->
          <div class="home-notice-right-have-picture">
            <div
              class="home-notice-right-have-picture-list-item"
              v-for="(item, i) in noticelist.picnotice"
              :key="i"
              @click="goTo(item.path)"
            >
              <div class="home-notice-right-have-picture-list-item-img">
                <img :src="item.cover_url" />
              </div>
              <div class="home-notice-right-have-picture-list-item-title">
                {{ item.title }}
              </div>
            </div>
          </div>

          <!-- 无图公告 -->
          <div class="home-notice-right-no-picture">
            <div
              class="home-notice-right-no-picture-list-item"
              v-for="(item, i) in noticelist.notice"
              :key="i"
              @click="goTo(item.path)"
            >
              <div class="home-notice-right-no-picture-list-item-content">
                <div class="home-notice-right-no-picture-list-item-content-title">
                  {{ item.title }}
                </div>
                <div><img :src="arrowRight" /></div>
              </div>
              <div class="line"></div>
            </div>
          </div>

          <div class="author_list_more" :style="{ backgroundImage: `url(${arrowRight})` }">
            <span>更多</span>
          </div>
        </div>
      </div>

      <!-- 右侧：活动 -->
      <div class="home-activity">
        <div class="home-activity-left">
          <div class="author_list_title">创作活动</div>
          <img :src="iconTit1" class="author_list_title_icon" />
        </div>

        <div class="home-activity-right">
          <div class="home-activity-right-list">
            <div
              class="home-activity-right-list-item"
              v-for="(item, i) in noticelist.active"
              :key="i"
              @click="goTo(item.path)"
            >
              <div class="home-activity-right-list-item-img">
                <img :src="item.cover_url" />
              </div>
              <div class="home-activity-right-list-item-text">
                <div class="home-activity-right-list-item-text-title">{{ item.title }}</div>
                <div class="home-activity-right-list-item-text-startime">{{ item.updated_at }}</div>
              </div>
            </div>
          </div>
          <div class="author_list_more" :style="{ backgroundImage: `url(${arrowRight})` }">
            <span>更多</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, computed } from 'vue'
import { useGoTo } from '@/composables/useGoTo'
import { useUserStore } from '@/stores/useUserStore'
import { getNewsList } from '@/apis/writer'

interface PicNotice {
  cover_url: string
  title: string
  path: string
}

interface Notice {
  title: string
  path: string
}

interface Active {
  cover_url: string
  title: string
  path: string
  updated_at: string
}

interface Noticelist {
  picnotice: PicNotice[]
  notice: Notice[]
  active: Active[]
}

const { goTo } = useGoTo()
const userStore = useUserStore()

const noticelist = reactive<Noticelist>({
  picnotice: [],
  notice: [],
  active: []
})

const defaultAvatar = new URL('@/assets/images/writer/active/not-login.png', import.meta.url).href
const iconTit1 = new URL('@/assets/images/writer/active/tit-1.png', import.meta.url).href
const arrowRight = new URL('@/assets/icons/arrow-right/icons8-arrow-100.png', import.meta.url).href

const getGreeting = (): string => {
  const hour = new Date().getHours()
  if (hour < 12) return '早上好'
  if (hour < 18) return '下午好'
  return '晚上好'
}

const displayAvatar = computed(() =>
  userStore.isLogin ? userStore.user?.avatar || defaultAvatar : defaultAvatar
)

const greetingText = computed(() => {
  if (userStore.isLogin) {
    const nickname = userStore.user?.nickname || '用户'
    return `${getGreeting()}，${nickname}`
  } else {
    return '请登录'
  }
})

const greetingDescHtml = computed(() => {
  if (userStore.isLogin && userStore.isAuthor) {
    const days = userStore.daysAsAuthor
    return `今天是你在番茄创作的第 <b class="highlight">${days}</b> 天`
  }
  return '欢迎成为番茄作家'
})

const fetchAllNotices = async () => {
  const [picRes, noticeRes, activeRes] = await Promise.all([
    getNewsList({ type: 'picnotice', limit: 2 }),
    getNewsList({ type: 'notice', limit: 6 }),
    getNewsList({ type: 'active', limit: 2 })
  ])
  noticelist.picnotice = picRes.data || []
  noticelist.notice = noticeRes.data || []
  noticelist.active = activeRes.data || []
  console.log('公告数据:', noticelist)
}

onMounted(fetchAllNotices)
</script>

<style scoped>
.author_active {
  padding-bottom: 60px;
}

.user_card {
  border-bottom: 0.5px solid #0000001f;
  display: flex;
  flex-direction: row;
  height: 100px;
  justify-content: space-between;
  width: 1240px;
}

.user-card-left {
  align-items: center;
  display: flex;
  flex-direction: row;
  width: 500px;
}

.user-card-left-avatar {
  border-radius: 50%;
  height: 44px;
  width: 44px;
}

.user-card-left-text {
  flex: 1;
  height: 100%;
  margin-left: 16px;
  margin-top: 55px;
}

.user-card-left-text-hello {
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  margin-bottom: 4px;
}

.user-card-left-text-title {
  color: #0006;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
}

.user-card-left-text-title b {
  color: #ff5f00;
  font-weight: 400;
}

.user-card-right {
  align-items: center;
  display: flex;
  flex-direction: row;
}

.user-card-right span {
  display: inline-block;
  cursor: pointer;
  width: 120px;
  line-height: 35px;
  height: 36px;
  background-color: rgba(0, 0, 0, 0.04);
  background-image: none;
  color: rgba(0, 0, 0, 0.64);
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  border-radius: 50px;
}

.user-card-right .btn1 {
  color: #fff;
  margin-right: 20px;
  background-color: rgb(255, 95, 0);
  background-image: none;
}

.home-list {
  display: flex;
  justify-content: space-around;
  margin-top: 60px;
  width: 1240px;
}

.home-notice {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  transition: all 0.4s;
  width: 540px;
}

.home-notice-left {
  align-items: flex-start;
  justify-content: flex-start;
  width: 175px;
}

.author_list_title {
  margin-left: -35px;
  position: relative;
  width: 1em;
  font-size: 26px;
  color: #000;
  line-height: 1;
}

.author_list_title_icon {
  bottom: 30px;
  height: 32px;
  left: -15px;
  position: relative;
  width: 31px;
}

.home-notice-right {
  font-size: 16px;
  font-weight: 400;
  left: 20px;
  line-height: 24px;
  position: relative;
}

.home-notice-right-have-picture {
  display: flex;
}

.home-notice-right-have-picture-list-item:first-child {
  margin-right: 30px;
}

.home-notice-right-have-picture-list-item-img {
  border-radius: 8px;
  cursor: pointer;
  height: 110px;
  overflow: hidden;
  width: 238px;
}

.home-notice-right-have-picture-list-item-img img {
  height: 110px;
  transition: transform 0.2s ease-in;
  width: 238px;
}

.home-notice-right-have-picture-list-item-img img:hover {
  transform: scale(1.1);
}

.home-notice-right-have-picture-list-item-title {
  margin-top: 12px;
}

.home-notice-right-no-picture {
  margin-bottom: 30px;
  margin-top: 40px;
}

.home-notice-right-no-picture-list-item {
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  line-height: 22px;
  margin-bottom: 38px;
}

.home-notice-right-no-picture-list-item-content {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.home-notice-right-no-picture-list-item-content-title {
  display: inline-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  width: 90%;
}

.home-notice-right-no-picture-list-item-content img {
  width: 12px;
  vertical-align: middle;
}

.home-notice-right-no-picture-list-item-content:last-child {
  margin: 0;
}

.home-notice-right-no-picture-list-item-content i:before {
  font-size: 6px;
}

.home-notice-right-no-picture-list-item-flash-bar,
.home-notice-right-no-picture-list-item-flash-bar-back {
  border-top: 1px solid #000000a3;
  height: 1px;
  margin-top: 10px;
  transform-origin: 0;
  visibility: hidden;
  width: 100%;
  will-change: transform;
}

.home-notice-right-no-picture-list-item-flash-bar-back {
  animation: bar-animation-back 0.2s;
  visibility: visible;
}

.home-notice-right-no-picture-list-item:hover .home-notice-right-no-picture-list-item-flash-bar {
  animation: bar-animation 0.4s;
  visibility: visible;
}

.home-notice-right-no-picture-list-item .line {
  position: absolute;
  left: 0;
  width: 100%;
  bottom: -15px;
  height: 1px;
  width: 0;
  background-color: #000;
  transition: all 0.3s;
}

.home-notice-right-no-picture-list-item:hover .line {
  width: 100%;
  transition: all 0.3s;
}

.home-activity {
  display: flex;
  justify-content: space-around;
  left: 52px;
  position: relative;
}

.home-activity-left {
  width: 144px;
}

.home-activity-left .author_list_title {
  margin-left: 20px;
}

.home-activity-left .author_list_title_icon {
  left: 40px;
}

.home-activity-right {
  flex: 1;
}

.home-activity-right-list {
  left: -10px;
  position: relative;
}

.home-activity-right-list-item {
  margin-bottom: 28px;
}

.home-activity-right-list-item-img {
  border-radius: 8px;
  cursor: pointer;
  height: 196px;
  overflow: hidden;
  width: 400px;
}

.home-activity-right-list-item-img img {
  height: 196px;
  transition: transform 0.2s ease-in;
  width: 400px;
}

.home-activity-right-list-item-img img:hover {
  transform: scale(1.1);
}

.home-activity-right-list-item-text {
  margin-top: 12px;
}

.home-activity-right-list-item-text-title {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}

.home-activity-right-list-item-text-startime {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  margin-top: 2px;
  opacity: 0.4;
}

.author_list_more {
  display: inline-block;
  background-image: url('@/assets/icons/arrow-right/icons8-arrow-100.png');
  background-size: 12px auto;
  background-repeat: no-repeat;
  background-position: right center;
  font-size: 14px;
  color: #333;
  opacity: 0.6;
  padding-right: 16px;
  cursor: pointer;
  transition: 0.3s;
}

.author_list_more:hover {
  background-image: url('@/assets/icons/arrow-right/icons9-arrow-100.png');
  color: #ff8140;
  opacity: 1;
  transition: 0.3s;
}

:deep(.highlight) {
  color: #ff5f00;
  font-weight: normal;
}
</style>
