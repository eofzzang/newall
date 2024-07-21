import { fetchGetGroupList } from '../api/index.js'

Vue.component('menu-category', {
  template:`
  <div>  
    <div class="menu-category-area">
      <div class="common-inner">
        <ul class="category-list scroll-x">
          <li class="category-item" v-for="item in groupItems" @click="onClickCategory(item.category)">
            <a class="category-tab" :class="{'is-active':category == item.category}">{{item.categoryName}}</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="menu-list-area" :data-scroll-id="group.category"
      :class="{'is-closed': group.isClosed}" v-for="group in groupItems">
      <div class="common-inner">
        <div class="menu-category" @click="toggle(group)">
          <p class="title">{{group.categoryName}}</p>
          <button class="btn-toggle"><img class="ico-arrow" src="./assets/images/ico-arrow.svg" alt=""></button>
        </div>
        <ul class="menu-list">
          <li class="menu-item" v-for="item in group.items" @click="redirectDetailPage(item)">
            <a class="menu-detail">
              <div class="menu-img-area">
                <img :src="item.imgUrl" :alt="item.name" class="menu-img" width="100" height="110">
              </div>
              <div class="menu-info-area">
                <p class="menu-name-group">
                  <span class="menu-name">{{item.name}}</span>
                  <img v-if="item.isNew" src="./assets/images/ico-new.svg" alt="new" class="ico-new">
                </p>
                <div class="menu-info-group">
                  <span class="menu-grade"><img class="ico-star" src="./assets/images/ico-star.svg" alt="">{{item.reviewPoint}}</span>
                  <span class="menu-number-of-order">주문수<em>{{item.orderCount}}</em></span>
                </div>
                <p class="menu-desc">{{item.description}}</p>
                <p class="menu-price">{{item.price.toLocaleString('ko-KR')}}원</p>
              </div>
            </a>
            <a v-if="item.soldOut"  class="btn-cart disabled">
              품절
            </a>
            <a v-else class="btn-cart">
              <img class="ico-cart" src="./assets/images/ico-cart-fill-green.svg" alt="주문하기">
              <span v-if="group.amount" class="num">{{group.amount}}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  `,
  mounted() {
    fetchGetGroupList().then((response) => this.groupItems = response);
  },
  data() {
    return {
      groupItems: [],
      category: 'recommends',
    }
  },
  methods: {
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
    },
    redirectDetailPage(item) {
      if (item.soldOut) {
        alert('품절입니다.');
        return;
      }
      history.pushState(null, null, '/detail/'+item.id);
      dispatchEvent(new PopStateEvent('popstate'));
    }
  }
})