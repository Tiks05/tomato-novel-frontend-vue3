<template>
  <div class="zone-footer">
    <div class="zone-footer-ctn">
      <div class="zone-footer-ctn-left">
        <div class="zone-footer-ctn-left-left">
          <div class="logo-box">
            <img :src="logo" alt="logo" class="logo-img" />
            <span class="logo-text">番茄小说网</span>
          </div>

          <a href="/protocal/agreement" target="_blank">《番茄小说网用户协议》</a>
          <a href="/protocal/privacy" target="_blank" style="margin-top: 4px"
            >《番茄小说网隐私政策》</a
          >
          <p style="margin-top: 58px">© 2025 本系统仅供学习与教学使用</p>
        </div>

        <div class="zone-footer-ctn-left-right">
          <a
            target="_blank"
            href="https://beian.miit.gov.cn/#/Integrated/index"
            rel="noopener noreferrer nofollow"
            >京ICP备18018851号-8</a
          >
          <a
            target="_blank"
            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802030409"
            rel="noopener noreferrer nofollow"
            style="margin-top: 2px"
          >
            <span class="police"></span> 京公网安备 11010802030409号
          </a>
          <a
            target="_blank"
            href="https://fanqienovel.com/writer/zone/licence/icp"
            rel="noopener noreferrer nofollow"
            style="margin-top: 2px"
            >京ICP证 京B2-20200085号</a
          >

          <div class="zone-footer-ctn-left-licence" style="margin-top: 2px">
            <a
              target="_blank"
              href="https://fanqienovel.com/writer/zone/licence/business"
              rel="noopener noreferrer nofollow"
              >营业执照</a
            >
            <a
              target="_blank"
              href="https://fanqienovel.com/writer/zone/licence/publication"
              rel="noopener noreferrer nofollow"
              >出版物经营许可证</a
            >
            <a
              target="_blank"
              href="https://fanqienovel.com/writer/zone/licence/radioTv"
              rel="noopener noreferrer nofollow"
              >广播电视节目制作经营许可证</a
            >
          </div>

          <div class="zone-footer-ctn-left-right-msg">
            <p>
              广告投放：<a
                href="https://www.oceanengine.com/resource/fanqie?source=fanqiepc"
                rel="noopener noreferrer nofollow"
                target="_blank"
                >www.oceanengine.com</a
              >
            </p>
            <p>
              不良信息举报：<span class="zone-footer-ctn-left-right-msg-report"
                >fanqiejubao@bytedance.com</span
              >
            </p>
            <p>意见建议邮箱：original_articles@bytedance.com</p>
            <p>版权咨询：2947820142@qq.com</p>
            <a href="/friend_links" target="_blank" rel="noopener noreferrer">友情链接</a>
          </div>
        </div>
      </div>

      <div class="zone-footer-ctn-right">
        <div class="zone-footer-ctn-right-wechat">
          <img
            src="https://p6-novel.byteimg.com/origin/novel-static/cc64631d97326693e96de67c759a608d"
          />
          <div class="zone-footer-ctn-right-wechat-desc">打开微信扫码关注微信公众号</div>
        </div>
        <div class="zone-footer-ctn-right-tiktok">
          <img
            src="https://p3-novel.byteimg.com/origin/novel-static/9d78ec9edddfacb4fb2013dc36db9818"
          />
          <div class="zone-footer-ctn-right-tiktok-desc">打开抖音扫码关注官方帐号</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const logo = new URL('@/assets/icons/logo/icons8-firebase-undefined-32.png', import.meta.url).href
</script>

<style scoped>
/* logo组合样式 */
.logo-box {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.logo-img {
  width: 32px;
  height: 32px;
  margin-right: 8px;
}
.logo-text {
  font-size: 18px;
  color: #333;
}

.zone-footer {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 348px;
  background: #f1f1f1;
}

.zone-footer-ctn {
  display: flex;
  width: 1240px;
  height: 100%;
  margin: 0 auto;
  font-size: 16px;
}

.zone-footer-ctn-left {
  display: flex;
  width: 850px;
  margin-top: 50px;
  font-size: 12px;
  font-weight: 400;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.8);
}

.zone-footer-ctn-left-licence a:not(:last-child) {
  margin-right: 8px;
}

.zone-footer-ctn-left a,
.zone-footer-ctn-left a:link,
.zone-footer-ctn-left a:visited {
  max-width: 400px;
  color: rgba(0, 0, 0, 0.8);
  text-decoration: none;
}

.zone-footer-ctn-left a:hover {
  color: #ff5f00;
}

.zone-footer-ctn-left-left {
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100%;
}

.zone-footer-ctn-left-right {
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-top: -1px;
  margin-left: 118px;
}

.zone-footer-ctn-left-right .police {
  display: inline-block;
  width: 14px;
  height: 14px;
  margin-top: -4px;
  margin-right: 1px;
  margin-left: 3px;
  line-height: 16px;
  vertical-align: middle;
  background-size: cover;
  background-image: url('@/assets/images/layout/footer/police.png');
}

.zone-footer-ctn-left-right-msg {
  margin-top: 52px;
}

.zone-footer-ctn-left-right-msg p {
  margin-top: 2px;
  margin-bottom: 0;
  line-height: 22px;
}

.zone-footer-ctn-left-right-msg-report:hover {
  color: #ff5f00;
  cursor: pointer;
}

.zone-footer-ctn-right {
  display: flex;
  flex: 1;
  margin-top: 196px;
  margin-left: 93px;
}

.zone-footer-ctn-right-tiktok,
.zone-footer-ctn-right-wechat {
  position: relative;
}

.zone-footer-ctn-right-tiktok img,
.zone-footer-ctn-right-wechat img {
  width: 78px;
}

.zone-footer-ctn-right-tiktok-desc,
.zone-footer-ctn-right-wechat-desc {
  position: absolute;
  top: 82px;
  left: -40px;
  height: 20px;
  font-size: 12px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.8);
  white-space: nowrap;
}

.zone-footer-ctn-right-wechat-desc {
  left: -35px;
}

.zone-footer-ctn-right-tiktok {
  margin-left: 104px;
}

.zone-footer-ctn-right-tiktok-desc {
  left: -35px;
}
</style>
