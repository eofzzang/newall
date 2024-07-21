import { fetchGetRecentOrders, fetchGetGroupList } from './api/index.js'

new Vue({
  el:'.container',
  mounted() {
    fetchGetRecentOrders().then((response) => this.recentMenuItems = response);
    fetchGetGroupList().then((response) => this.groupItems = response);
  },
  data() {
    return {
      tabList: [
        '홈','메뉴','리뷰','사진','지도','주변'
      ],
      tabIndex: 0,
      tab: "tab",
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
      groupItems: [],
      category: 'recommends',
      cartItems: [],
    }
  },
  methods: {
    onClickTabList(idx) {
      this.tabIndex = idx;
    }, 
    onClickTabList2(idx) {
      this.tabIndex2 = idx;
    },
    redirectDetailPage(id) {
      history.pushState(null, null, '/detail/'+id);
      dispatchEvent(new PopStateEvent('popstate'));
    },
    onClickCategory(category) {
      this.category = category;

      const y = document.querySelector('[data-scroll-id='+category+']').getBoundingClientRect().top;

      window.scrollBy({
        top: y - 140,
        left:0,
        behavior: 'smooth',
      })
    },
    toggle(group) {
      group.isClosed = !group.isClosed;
    }
  }
})