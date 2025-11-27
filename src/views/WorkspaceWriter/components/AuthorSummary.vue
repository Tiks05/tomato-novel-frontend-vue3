<template>
  <div class="tower_con">
    <div class="serial-card">
      <div class="home-display">
        <img width="70" height="70" class="home-display-img" :src="greetingImg" />
        <div class="home-display-desc">
          <div class="desc-author font-1">
            {{ greetingText }}
            <span style="margin-right: 8px"></span>
            <div class="home-display-desc-medal" style="margin-left: 4px">
              <div class="home-display-desc-medal-level">
                <div
                  class="home-display-desc-medal-level-name"
                  style="background: rgb(238, 230, 245); color: rgb(106, 93, 112)"
                >
                  <span style="opacity: 0.8">Lv.{{ userStore.user?.level || 0 }}</span>
                </div>
                <img :src="levelImg" />
              </div>
            </div>
          </div>
          <div class="desc-day font-2" v-html="greetingDescHtml"></div>
        </div>

        <div class="home-display-detail home-display-fansnum">
          <div class="detail-label font-4">
            粉丝数<span class="icon-circle-info tomato-circle-info"></span>
          </div>
          <div class="detail-count font-1">{{ stats.fans_count || 0 }}</div>
        </div>

        <div class="home-display-detail home-display-wordnum">
          <div class="detail-label font-4">
            累计创作字数<span class="icon-circle-info tomato-circle-info"></span>
          </div>
          <div class="detail-count font-1">{{ stats.total_words || '0' }}</div>
        </div>
      </div>
    </div>

    <!-- 小说短故事 -->
    <BookSummary />

    <div class="tower_wp">
      <div class="tower_left">
        <Calendar />
        <HotKeywordRank />
      </div>
      <div class="tower_right">
        <Active />
        <Notice />
        <EditorRecommend />
        <NewBookRanking />
      </div>
    </div>

    <FooterCopyright />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/useUserStore'
import { getUserStats } from '@/apis/workspace'

import BookSummary from '@/views/WorkspaceWriter/components/BookSummary.vue'
import Calendar from '@/views/WorkspaceWriter/components/Calendar.vue'
import HotKeywordRank from '@/views/WorkspaceWriter/components/HotKeywordRank.vue'
import Active from '@/views/WorkspaceWriter/components/Active.vue'
import Notice from '@/views/WorkspaceWriter/components/Notice.vue'
import EditorRecommend from '@/views/WorkspaceWriter/components/EditorRecommend.vue'
import NewBookRanking from '@/views/WorkspaceWriter/components/NewBookRanking.vue'
import FooterCopyright from '@/views/WorkspaceWriter/components/FooterCopyright.vue'

const userStore = useUserStore()

// 用户统计数据类型
interface UserStats {
  fans_count: number
  total_words: number
}

// 统计数据响应式存储
const stats = ref<UserStats>({
  fans_count: 0,
  total_words: 0
})

onMounted(async () => {
  if (userStore.id) {
    try {
      const res = await getUserStats(userStore.id)
      stats.value = res.data
    } catch (error) {
      console.error('获取用户统计信息失败:', error)
    }
  }
})

// 问候语文本
const getGreeting = (): string => {
  const hour = new Date().getHours()
  if (hour < 12) return '早上好'
  if (hour < 18) return '下午好'
  return '晚上好'
}

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
    return `今天是番茄陪你的第 <b class="highlight">${userStore.daysAsAuthor}</b> 天，努力加油码字吧`
  }
  return '欢迎来到番茄作家专区，快来开启创作吧！'
})

const greetingImg = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12)
    return new URL('@/assets/images/workspace/writer/afternoon.gif', import.meta.url).href
  if (hour < 18)
    return new URL('@/assets/images/workspace/writer/afternoon.gif', import.meta.url).href
  return new URL('@/assets/images/workspace/writer/afternoon.gif', import.meta.url).href
})

const levelImg = computed(() => {
  const level = userStore.user?.level || 0
  return new URL(`/src/assets/images/workspace/writer/lvx.png`, import.meta.url).href
})
</script>

<style scoped>
.tower_con {
  margin-left: 250px;
  padding-top: 15px;
}
.serial-card {
  background-color: #fff;
  border-radius: 12px;
}
.home-display {
  align-items: center;
  display: flex;
  height: 120px;
  overflow: hidden;
  padding-left: 30px;
}
.home-display-img {
  height: 70px;
  margin-right: 12px;
}
.home-display-desc {
  flex: 1;
}
.home-display-desc .desc-author {
  align-items: center;
  display: flex;
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
}
.home-display-desc .desc-day {
  font-size: 14px;
  line-height: 22px;
  margin-top: 6px;
  color: #999;
}
.home-display-desc-medal {
  height: 26px;
  margin-left: 4px;
  position: relative;
  width: 26px;
}
.home-display-desc-medal-tooltip.byte-tooltip.serial-tooltip-primary .byte-tooltip-content {
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 4px 20px #00000014;
  height: 38px;
  padding: 8px 14px;
}
.home-display-desc-medal-tooltip.byte-tooltip.serial-tooltip-primary:after {
  border-bottom: 4px solid #0000;
  border-left: 4px solid #fff;
  border-top: 4px solid #0000;
  content: '';
  left: 38px;
  position: absolute;
  top: 36px;
  transform: rotate(90deg);
}
.home-display-desc-medal img {
  height: 100%;
  width: 100%;
}
.home-display-desc-medal-fold {
  height: 100%;
  position: relative;
  width: 100%;
}
.home-display-desc-medal-fold img {
  left: 0;
  position: absolute;
  top: 0;
}
.home-display-desc-medal-fold-num {
  align-items: center;
  background: linear-gradient(315deg, #f6f6f6, #e5e5e5);
  border-radius: 46px;
  color: #0006;
  display: flex;
  font-family: PingFang SC;
  font-size: 18px;
  font-weight: 500;
  height: 34px;
  justify-content: flex-end;
  left: 5px;
  padding-left: 40px;
  padding-right: 12px;
  position: absolute;
  top: 50%;
  transform: scale(0.5);
  transform-origin: 0 -50%;
}
.home-display-desc-medal-fold-num span {
  white-space: nowrap;
}
.home-display-desc-medal-level {
  height: 100%;
  position: relative;
  width: 100%;
}
.home-display-desc-medal-level img {
  left: 0;
  position: absolute;
  top: 0;
}
.home-display-desc-medal-level-name {
  align-items: center;
  background: linear-gradient(315deg, #f6f6f6, #e5e5e5);
  border-radius: 46px;
  color: #0006;
  display: flex;
  font-family: PingFang SC;
  font-size: 18px;
  font-weight: 500;
  height: 34px;
  justify-content: flex-end;
  left: 5px;
  padding-left: 42px;
  padding-right: 18px;
  position: absolute;
  top: 50%;
  transform: scale(0.5);
  transform-origin: 0 -50%;
}
.home-display-desc-medal-level-name span {
  white-space: nowrap;
}
.home-display-desc-medal-collect {
  display: flex;
  flex-wrap: wrap;
  margin: 8px 2px;
  width: 292px;
}
.home-display-desc-medal-collect-item {
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-right: 12px;
}
.home-display-desc-medal-collect-item:nth-child(4n) {
  margin-right: 0;
}
.home-display-desc-medal-collect-item:nth-child(n + 5) {
  margin-top: 12px;
}
.home-display-desc-medal-collect-item-cover {
  height: 64px;
  width: 64px;
}
.home-display-desc-medal-collect-item-name {
  color: #000c;
  font-family: PingFang SC;
  font-size: 12px;
  line-height: 20px;
  margin-top: 2px;
  text-align: center;
}
.home-display-desc-level-medal {
  height: 24px;
  width: 24px;
}
.home-display-detail {
  flex: 0 0 150px;
}
.home-display-detail .detail-label {
  align-items: center;
  color: #999;
  display: flex;
  font-size: 14px;
  line-height: 22px;
}
.home-display-detail .detail-label span {
  margin-left: 6px;
}
.home-display-detail .detail-count {
  font-family: SFProText;
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
  margin-top: 4px;
}
.home-display-wordnum {
  flex: 0 0 150px;
}
.home-display-fansnum {
  flex: 0 0 190px;
}
.tower_wp {
  width: 100%;
  margin-top: 15px;
  overflow: hidden;
}
.tower_wp .tower_left {
  width: 552px;
  float: left;
}
.tower_wp .tower_right {
  width: 426px;
  float: right;
}

:deep(.highlight) {
  color: #ff5f00;
  font-weight: normal;
}
</style>
