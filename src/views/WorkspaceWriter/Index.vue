<template>
  <div>
    <Header v-if="navMenus" :menus="navMenus" />

    <div class="h64"></div>
    <div class="index_wrapper">
      <!-- 左侧 -->
      <div id="AuthorWork_left">
        <div class="left_con">
          <div class="item" v-for="(item, i) in menus" :key="i">
            <div class="tit" v-if="item.child.length > 0" @click="toggleMenu(item.id)">
              <div class="icon">
                <img :src="item.pic" alt="" />
              </div>
              {{ item.label }}
              <div class="rr" :class="{ on: isMenuActive(item.id) }">
                <img src="/src/assets/images/workspace/writer/x.png" alt="" />
              </div>
            </div>
            <div class="tit" v-else @click="GoHover(item)" :class="{ on: nowid == item.id }">
              <div class="icon">
                <img :src="item.pic" class="img1" alt="" />
                <img :src="item.pic2" class="img2" alt="" />
              </div>
              {{ item.label }}
            </div>

            <div class="down" :class="{ open: isMenuActive(item.id) }">
              <div
                class="nav"
                v-for="(arr, j) in item.child"
                :key="j"
                @click="GoHover(arr)"
                :class="{ on: nowid == arr.id }"
              >
                {{ arr.label }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Layout/Header.vue'
import { ref } from 'vue'
import { useGoTo } from '@/composables/useGoTo'
const { goTo } = useGoTo()
const activeMenuIds = ref(new Set())
const nowid = ref(1)

const navMenus = [
  { path: '/home', label: '番茄小说网' },
  { path: '/classroom', label: '作家课堂' },
  { path: '/benefit', label: '作家福利' },
  { path: '/notification', label: '消息通知' }
]

const menus = [
  {
    id: 1,
    path: '',
    label: '工作台',
    pic: '/src/assets/icons/work/i1.png',
    pic2: '/src/assets/icons/work/i1_2.png',
    child: []
  },
  {
    id: 2,
    path: '',
    label: '作品管理',
    pic: '/src/assets/icons/work/i2.png',
    pic2: '',
    child: [
      { id: 21, path: '/workspace/writer/novel', label: '小说' },
      { id: 22, path: '/workspace/writer/story', label: '短故事' }
    ]
  },
  {
    id: 3,
    path: '',
    label: '数据中心',
    pic: '/src/assets/icons/work/i3.png',
    pic2: '',
    child: [
      { id: 31, path: '/workspace/writer/noveldata', label: '小说数据' },
      { id: 32, path: '/workspace/writer/storydata', label: '短故事数据' }
    ]
  },
  {
    id: 4,
    path: '',
    label: '收益分析',
    pic: '/src/assets/icons/work/i4.png',
    pic2: '',
    child: [
      { id: 41, path: '/workspace/writer/novelincome', label: '小说收益' },
      { id: 42, path: '/workspace/writer/storyincome', label: '短故事稿费' }
    ]
  },
  {
    id: 5,
    path: '',
    label: '互动管理',
    pic: '/src/assets/icons/work/i5.png',
    pic2: '',
    child: [
      { id: 51, path: '/workspace/writer/comment', label: '评论管理' },
      { id: 52, path: '/workspace/writer/reward', label: '打赏管理' },
      { id: 53, path: '/workspace/writer/say', label: '有话说管理' },
      { id: 54, path: '/workspace/writer/fans', label: '粉丝管理' }
    ]
  },
  {
    id: 6,
    path: '/workspace/writer/inspiration',
    label: '开书灵感',
    pic: '/src/assets/icons/work/i6.png',
    pic2: '/src/assets/icons/work/i6_2.png',
    child: []
  },
  {
    id: 7,
    path: '',
    label: '作品运营',
    pic: '/src/assets/icons/work/i7.png',
    pic2: '',
    child: [
      { path: '/workspace/writer/source', label: '推荐素材' },
      { id: 71, path: '/workspace/writer/newbook', label: '新书预热' },
      { id: 72, path: '/workspace/writer/booktitle', label: '口碑书名' }
    ]
  },
  {
    id: 8,
    path: '/workspace/writer/benefit',
    label: '福利管理',
    pic: '/src/assets/icons/work/i8.png',
    pic2: '/src/assets/icons/work/i8_2.png',
    child: []
  },
  {
    id: 9,
    path: '/workspace/writer/level',
    label: '作家等级',
    pic: '/src/assets/icons/work/i9.png',
    pic2: '/src/assets/icons/work/i9_2.png',
    child: []
  }
]

const toggleMenu = (menuId: number) => {
  if (activeMenuIds.value.has(menuId)) {
    activeMenuIds.value.delete(menuId)
  } else {
    activeMenuIds.value.add(menuId)
  }
}

// 检查菜单是否展开
const isMenuActive = (menuId: number) => {
  return activeMenuIds.value.has(menuId)
}
const GoHover = (item: any) => {
  nowid.value = item.id
  goTo(item.path)
}
</script>

<style scoped>
.bg_bai {
  background-color: #fff;
}

.h64 {
  height: 64px;
}

.index_wrapper {
  width: 1240px;
  margin: auto;
}

#AuthorWork_left {
  position: fixed;
  left: 50%;
  width: 238px;
  top: 80px;
  bottom: 20px;
  margin-left: -620px;
}

#AuthorWork_left .left_con {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  background-color: #fff;
  padding: 12px;
  border-radius: 8px;
  overflow-x: hidden;
}

#AuthorWork_left .left_con .item .tit {
  position: relative;
  height: 44px;
  line-height: 44px;
  padding-left: 60px;
  cursor: pointer;
}

#AuthorWork_left .left_con .item .tit .icon img {
  position: absolute;
  left: 26px;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  vertical-align: middle;
}

#AuthorWork_left .left_con .item .tit:hover {
  background-color: #f6f6f6;
}

#AuthorWork_left .left_con .item .tit.on {
  background-color: #ff5f000a;
  color: #ff5f00;
}

#AuthorWork_left .left_con .item .tit.on:hover {
  background-color: #ff5f000a;
}

#AuthorWork_left .left_con .item .tit.on .img2 {
  display: block;
}

#AuthorWork_left .left_con .item .tit.on .img1 {
  display: none;
}

#AuthorWork_left .left_con .item .tit .img2 {
  display: none;
}

#AuthorWork_left .left_con .item .tit .img1 {
  display: block;
}

#AuthorWork_left .left_con .item .tit .rr {
  position: absolute;
  height: 12px;
  right: 25px;
  line-height: 1;
  top: 50%;
  transform: translateY(-50%);
}

#AuthorWork_left .left_con .item .tit .rr > img {
  position: static;
  vertical-align: middle;
  width: 12px;
}

#AuthorWork_left .left_con .item .tit .rr.on img {
  transform: rotate(180deg);
}

#AuthorWork_left .left_con .item .nav {
  padding-left: 60px;
  height: 44px;
  line-height: 44px;
  cursor: pointer;
}

#AuthorWork_left .left_con .item .nav:hover {
  background-color: #f6f6f6;
}

#AuthorWork_left .left_con .item .nav.on {
  background-color: #ff5f000a;
  color: #ff5f00;
}

#AuthorWork_left .left_con .item .nav.on:hover {
  background-color: #ff5f000a;
}

#AuthorWork_left .down {
  max-height: 0;
  overflow: hidden;
  /* transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1); */
}

#AuthorWork_left .down.open {
  max-height: 500px;
  /* 设置足够大的值以容纳二级菜单 */
}
</style>
