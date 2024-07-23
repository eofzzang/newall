Vue.component('header-area', {
  template: `
    <header class="header-area">
      <div class="place-header" role="banner">
        <h1 class="title">
          <a class="link-back">
            <img src="/newall/assets/images/ico-back.svg" alt="뒤로가기">
          </a>
          덮스 포트폴리오점
        </h1>
        <a class="my-orders">주문내역</a>
      </div>
      <div class="place-tab scroll-x" role="tablist">
        <div class="tab-inner">
          <a v-for="item, idx in tabList" @click="onClickTabList(idx)"
            class="tab" :class="{'is-active':tabIndex == idx}" role="tab">
            <span class="txt">{{item}}</span>
          </a>
        </div>
      </div>
    </header>
  `,
  data() {
    return {
      tabList: [
        '홈','메뉴','리뷰','사진','지도','주변'
      ],
      tabIndex: 0,
    }
  },
  methods: {
    onClickTabList(idx) {
      this.tabIndex = idx;
    }
  }
})