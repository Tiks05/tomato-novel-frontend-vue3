<template>
  <div class="ranking_wrapper">
    <div class="ranking_title">
      <h2>番茄巅峰榜</h2>
      <p>根据作品好评、人气、互动等综合得分排行</p>
    </div>
    <div class="ranking_swiper">
      <swiper
        :modules="[Navigation, Pagination, Autoplay]"
        :pagination="{ clickable: true }"
        :loop="false"
        :autoplay="{ delay: 3000 }"
        @swiper="onSwiper"
        @slide-change="onSlideChange"
      >
        <swiper-slide class="slide" v-for="(item, i) in shortcuts" :key="i">
          <div class="item" v-for="(slide, j) in item" :key="j">
            <div
              class="con"
              :class="
                slide.num == '01'
                  ? 'con1'
                  : slide.num == '02'
                    ? 'con2'
                    : slide.num == '03'
                      ? 'con3'
                      : ''
              "
              @click="goTo(slide.path)"
            >
              <div class="txt">
                <div class="number">{{ slide.num }}</div>
                <h4>{{ slide.title }}</h4>
                <p>{{ slide.desc }}</p>
              </div>
              <div class="pic">
                <img :src="slide.pic" alt="" />
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>

      <div
        class="swiper-button-prev"
        :class="{ swiper_disabled: isBeginning }"
        @click="slidePrev"
      ></div>
      <div class="swiper-button-next" :class="{ swiper_disabled: isEnd }" @click="slideNext"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

import { fetchTopBooks } from '@/apis/home'
import { useGoTo } from '@/composables/useGoTo'
const { goTo } = useGoTo()

const swiperInstance = ref<any>(null)
const isBeginning = ref(true)
const isEnd = ref(false)
const rawData = ref<any[]>([])

// 把返回的数据每9条分页
const shortcuts = computed(() => {
  const pageSize = 9
  const pages = []
  const total = rawData.value.length

  // 正常前三页
  for (let i = 0; i < 27; i += pageSize) {
    pages.push(rawData.value.slice(i, i + pageSize))
  }

  // 特殊处理最后一页：用22~30本（下标21~29）
  if (total >= 30) {
    pages.push(rawData.value.slice(21, 30))
  } else if (total > 27) {
    // 兼容防止不足30本的情况
    pages.push(rawData.value.slice(21, total))
  }

  return pages
})

const onSwiper = (swiper: any) => {
  swiperInstance.value = swiper
  isBeginning.value = swiper.isBeginning
  isEnd.value = swiper.isEnd
}

const onSlideChange = () => {
  if (swiperInstance.value) {
    isBeginning.value = swiperInstance.value.isBeginning
    isEnd.value = swiperInstance.value.isEnd
  }
}

const slidePrev = () => {
  if (swiperInstance.value) {
    swiperInstance.value.slidePrev()
  }
}

const slideNext = () => {
  if (swiperInstance.value) {
    swiperInstance.value.slideNext()
  }
}

// 初始化请求排行榜数据
onMounted(async () => {
  const res = await fetchTopBooks()
  rawData.value = res.data
})
</script>

<style>
.ranking_wrapper {
  width: 840px;
}

.ranking_title h2 {
  font-size: 24px;
  font-weight: bold;
  color: #000;
  position: relative;
  width: 156px;
  padding: 0 18px;
  line-height: 1;
}

.ranking_title p {
  margin-top: 15px;
  margin-bottom: 0;
  color: rgba(0, 0, 0, 0.4);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

.ranking_title h2:after,
.ranking_title h2:before {
  content: '';
  width: 13px;
  height: 29px;
  background-size: 100% 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-43%);
}

.ranking_title h2:before {
  left: 0;
  background-image: url('@/assets/images/home/ranking-list/tit-1.svg');
}

.ranking_title h2:after {
  right: 0;
  background-image: url('@/assets/images/home/ranking-list/tit-2.svg');
}

.ranking_swiper {
  margin-top: 12px;
  margin-left: -48px;
  position: relative;
}

.ranking_swiper .slide {
  overflow: hidden;
  padding-bottom: 40px;
}

.ranking_swiper .item {
  width: 33.3333%;
  float: left;
  padding-left: 48px;
  margin-top: 28px;
}

.ranking_swiper .item .con {
  position: relative;
  cursor: pointer;
  padding-right: 100px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 8px;
  overflow: hidden;
  background-repeat: no-repeat;
}

.ranking_swiper .item .con.con1 {
  background-color: #fef9f6;
  background-image: url('/src/assets/images/home/ranking-list/book_bg.svg');
}

.ranking_swiper .item .con.con2 {
  background-color: #f5faf8;
  background-image: url('/src/assets/images/home/ranking-list/book_bg.svg');
}

.ranking_swiper .item .con.con3 {
  background-color: #fffcf3;
  background-image: url('/src/assets/images/home/ranking-list/book_bg.svg');
}

.ranking_swiper .item .txt {
  height: 88px;
  position: relative;
  padding-left: 37px;
}

.ranking_swiper .item .txt .number {
  position: absolute;
  width: 37px;
  text-align: center;
  left: 0;
  top: 0;
  color: rgba(0, 0, 0, 0.4);
  font-size: 16px;
  line-height: 22px;
}

.ranking_swiper .item .txt h4 {
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: rgba(0, 0, 0, 0.8);
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
}

.ranking_swiper .item .txt p {
  margin-bottom: 0;
  color: rgba(0, 0, 0, 0.4);
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  text-transform: capitalize;
  width: 100%;
  word-wrap: normal;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.ranking_swiper .item .con:hover .txt h4 {
  color: #ff5f00;
}

.ranking_swiper .item .pic {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 12px;
}

.ranking_swiper .item .pic img {
  width: 66px;
  height: 88px;
  border-radius: 8px;
}

.ranking_swiper .swiper-pagination {
  bottom: 18px;
}

.ranking_swiper .swiper-pagination-bullet {
  width: 24px;
  cursor: pointer;
  height: 2px;
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0;
}

.ranking_swiper .swiper-pagination-bullet.swiper-pagination-bullet-active {
  background-color: #fa6725;
}

.ranking_swiper .swiper-button-prev,
.ranking_swiper .swiper-button-next {
  width: 44px;
  height: 44px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
}

.ranking_swiper .swiper-button-prev:after,
.ranking_swiper .swiper-button-next:after {
  font-size: 12px;
  color: #000;
  font-weight: bold;
}

.ranking_swiper .swiper-button-prev {
  left: -30px;
  transition: transform 0.6s;
}

.ranking_swiper .swiper-button-next {
  right: -60px;
  transition: transform 0.6s;
}

.ranking_swiper .swiper-button-prev:hover {
  transform: translateX(-8px);
}

.ranking_swiper .swiper-button-next:hover {
  transform: translateX(8px);
}

.ranking_swiper .swiper_disabled {
  display: none !important;
}

.ranking_swiper .item .con.con1 .number {
  color: #ff5f00;
}

.ranking_swiper .item .con.con2 .number {
  color: #007746;
}

.ranking_swiper .item .con.con3 .number {
  color: #dfa355;
}
</style>
