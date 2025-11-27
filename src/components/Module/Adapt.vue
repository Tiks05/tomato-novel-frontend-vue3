<template>
  <div class="adapt_wrapper">
    <div class="tit">
      <h2>版权改编</h2>
      <p>热门版权改编动漫、影视尽在番茄小说——来番茄小说，追精品IP原著小说</p>
      <span>查看全部</span>
    </div>
    <div class="marquee-container">
      <div class="adapt_list" :style="{ '--scroll-duration': `${duration}s` }">
        <div class="item" v-for="(item, i) in adaptlist" :key="i" @click="goTo(item.path)">
          <img :src="item.pic" alt="" />
        </div>
        <!-- 复制一份，用于无缝滚动 -->
        <div class="item" v-for="(item, i) in adaptlist" :key="i + adaptlist.length">
          <img :src="item.pic" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useGoTo } from '@/composables/useGoTo'
import { getAdaptList } from '@/apis/home'

// 定义数据类型
interface AdaptItem {
  id: number
  pic: string
  path: string
}

const adaptlist = ref<AdaptItem[]>([])
const duration = ref(30)
const { goTo } = useGoTo()

const fetchData = async () => {
  const res = await getAdaptList(20)
  adaptlist.value = res.data.data as AdaptItem[]
  // 动态计算滚动时长
  const itemWidth = 215 + 20 // 卡片宽度+margin
  const totalWidth = adaptlist.value.length * itemWidth
  const speed = 100 // 每秒滚动100px
  duration.value = totalWidth / speed
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.adapt_wrapper {
  background-image: url('@/assets/images/home/adapt/plot_type.png');
  background-size: cover;
  background-position: center;
  padding-top: 75px;
  padding-bottom: 120px;
}

.tit {
  text-align: center;
}

.tit h2 {
  font-size: 24px;
  color: #fff;
  display: inline-block;
  position: relative;
  padding-right: 35px;
  line-height: 1;
}

.tit h2:after {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-60%);
  width: 31px;
  height: 32px;
  background: url('@/assets/images/home/adapt/tit-1.png') no-repeat;
  background-size: 100% 100%;
}

.tit p {
  font-size: 16px;
  color: #fff;
  margin-top: 8px;
}

.tit span {
  display: inline-block;
  width: 150px;
  height: 40px;
  line-height: 40px;
  background: #fff url('@/assets/icons/arrow-right/icons8-arrow-100.png') no-repeat 80% center;
  background-size: 12px auto;
  border-radius: 50px;
  margin-top: 15px;
  padding-right: 15px;
  cursor: pointer;
}

.marquee-container {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.adapt_list {
  display: flex;
  width: max-content;
  animation: scroll var(--scroll-duration) linear infinite;
  /* 线性匀速动画（不快不慢）无限次循环播放动画 */
  padding: 0 15px;
  margin-top: 70px;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

.item {
  flex-shrink: 0;
  width: 215px;
  height: 315px;
  margin: 0 10px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.item img {
  width: 215px;
  height: 315px;
  transition: 0.3s;
}

.item:hover img {
  transform: scale(1.05);
  transition: 0.3s;
}
</style>
