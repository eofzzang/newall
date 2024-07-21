import { fetchGetRecentOrders } from '../api/index.js'

Vue.component('order-info-area', {
  template: `
    <div class="order-info-area">
      <div class="common-inner">
        <div class="info-main">
          <div class="info-main-title">
            <div class="title">
              <svg viewBox="0 0 18 18" class="ico-n-logo">
                <path fill-rule="evenodd" fill="currentColor"
                  d="M18 0v18H0V0h18zM7.255 4.582H4.473v9.054h2.915V8.79l3.357 4.846h2.782V4.582h-2.915v4.846L7.255 4.582z">
                </path>
              </svg>
              주문
            </div>
          </div>

          <!-- 주문분류 -->
          <div class="tab-switch-box" role="tablist">
            <a v-for="item, idx in tabList2" @click="onClickTabList2(idx)"
              class="tab-switch" :class="{'is-active':tabIndex2 == idx}" role="tab">
              <span v-html="item.text"></span><img :src="item.imgUrl" alt="" class="ico-check" :aria-hidden="tabIndex2 == idx">
            </a>
          </div>

          <div class="info-main-notice">
            {{tabList2Text[tabIndex2]}}
          </div>

          <div class="info-main-notice alert hidden">
            <svg aria-hidden="true" class="ico-clock" viewBox="0 0 13 13" width="13" height="13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M6.5 0a6.5 6.5 0 110 13 6.5 6.5 0 010-13zm0 1a5.5 5.5 0 100 11 5.5 5.5 0 000-11zm.492 1.137v4.157l2.792 2.674-.692.722-3.1-2.97V2.137h1z"></path>
            </svg>
            지금은 주문을 받을 수 없습니다.
          </div>

          <!-- 최근 주문 내역-->
          <div class="recent-order-area">
            <div class="recent-title">
              <img src="./assets/images/ico-clock.svg" alt="" class="ico-clock">최근<br>주문
            </div>
            <div class="recent-menu-area scroll-x">
              <ul class="recent-menu-list">
                <li v-for="item in recentMenuItems" @click="redirectDetailPage(item.id)" class="recent-menu-item is-ordered">
                  <!-- <a href="./detail.html"> -->
                    <div class="menu-img-area">
                      <span v-if="item.isPopular" class="badge-popular">인기</span>
                      <img class="menu-img" src="https://via.placeholder.com/80" alt="메뉴사진">
                    </div>
                    <p class="menu-name">{{item.name}}</p>
                    <p class="menu-price">{{item.price.toLocaleString('ko-KR')}}원</p>
                  <!-- </a> -->
                  <a class="badge-cart">
                    <img src="./assets/images/ico-cart.svg" alt="" class="ico-cart">
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  mounted() {
    fetchGetRecentOrders().then((response) => this.recentMenuItems = response);
  },
  data() {
    return {
      tabList2: [
        {text:'🛍&nbsp;&nbsp;포장', imgUrl:'assets/images/ico-check.svg'},
        {text:'🍽&nbsp;&nbsp;매장', imgUrl:'assets/images/ico-check.svg'},
        {text:'🛵&nbsp;&nbsp;배달', imgUrl:'assets/images/ico-check.svg'}
      ],
      tabIndex2: 0,
      tabList2Text: [
        '가지고 가실 수 있게 포장해 드립니다.',
        '매장에서 드실수 있게 만들어 드립니다.',
        '배달주문이 가능한 매장입니다.',
      ],
      recentMenuItems: [],
    }
  },
  methods: {
    onClickTabList2(idx) {
      this.tabIndex2 = idx;
    },
    redirectDetailPage(id) {
      history.pushState(null, null, '/detail/'+id);
      dispatchEvent(new PopStateEvent('popstate'));
      this.$emit('upd', {idx:this.tabIndex2, text:this.tabList2Text[this.tabIndex2]});
    },
  }
})