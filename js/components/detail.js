import { fetchGetMenu } from '../api/index.js'

Vue.component('detail-area', {
  template:`
    <div class="menu-detail-area">
      <!-- 메뉴 이미지 영역 -->
      <div class="menu-img" 
        :style="{'background-image':'url('+menu.imgUrl+')'}">
      </div>

      <!-- 메뉴 주문 정보 영역-->
      <div class="menu-info-area">
        <div class="common-inner">
          <!-- 메뉴정보영역 -->
          <p class="menu-name-group">
            <span class="menu-name">{{menu.name}}</span>
            <span v-if="menu.reviewPoint > 4" class="badge-popular">인기</span>
          </p>

          <div class="menu-info-group">
            <span class="menu-price">{{menu.price.toLocaleString('ko-KR')}}원</span>
            <span class="menu-grade"><img src="../assets/images/ico-star.svg" 
              class="ico-star" alt="">{{menu.reviewPoint}}</span>
            <span class="menu-number-of-order">주문수<em>{{menu.orderCount}}</em></span>
          </div>

          <p class="menu-desc">{{menu.description}}</p>
          <!-- //메뉴정보영역 -->

          <!-- 메뉴주문영역-->
          <div class="order-type-area">
            <div class="type-select">
              <div class="title">
                <svg viewBox="0 0 18 18" class="ico-n-logo">
                  <path fill-rule="evenodd" fill="currentColor"
                    d="M18 0v18H0V0h18zM7.255 4.582H4.473v9.054h2.915V8.79l3.357 4.846h2.782V4.582h-2.915v4.846L7.255 4.582z">
                  </path>
                </svg>
                주문
              </div>
              <div class="tab-switch-box" role="tablist">
                <a class="tab-switch" :class="{'is-active':orderType == 0}" 
                  @click="() => orderType = 0" role="tab">🛍&nbsp;&nbsp;포장</a>
                <a class="tab-switch" :class="{'is-active':orderType == 1}" 
                  @click="() => orderType = 1" role="tab">🍽&nbsp;&nbsp;매장</a>
              </div>
            </div>
            <div class="type-amount">
              <div class="title">수량</div>
              <div class="amount-select">
                <button class="btn-minus" :class="amount == 1 ? 'disabled':'enabled'" aria-label="빼기" @click="onDecrease"></button>
                <span class="amount">{{amount}}</span>
                <button class="btn-plus enabled" aria-label="더하기" @click="onIncrease"></button>
              </div>
            </div>
            <button class="btn-order" @click="popupOpen">{{amount}}개 담기 {{price.toLocaleString('ko-KR')}}원</button>
            <!-- <button class="btn-order" disabled>지금 주문 가능한 시간이 아닙니다.지금 주문 가능한 시간이 아닙니다.지금 주문 가능한 시간이 아닙니다.</button> -->
          </div>
          <!-- // 메뉴주문영역 -->
        </div>
      </div>
    </div>
  `,
  mounted() {
    const [menuId] = window.location.pathname.split('/').splice(-1);
    fetchGetMenu(menuId).then((response) => this.menu = response[0]);
  },
  props: {
    orderType: Number
  },
  data() {
    return {
      menu: DEFAULT_MENU,
      amount: 1,
      orderTypeText: ['포장','매장','배달'],
      
    }
  },
  computed: {
    price() {
      return this.amount * this.menu.price;
    }
  },
  methods: {
    onDecrease() {
      if (this.amount > 1) this.amount--;
    },
    onIncrease() {
      this.amount = this.amount + 1;
    },
    popupOpen() {
      for (var list of this.menu.optionList) {
        Vue.set(list, 'amount', 0);
      }
      var obj = {
        name :this.menu.name,
        description: this.menu.description,
        imgUrl: this.menu.imgUrl,
        orderTypeText :this.orderTypeText[this.orderType],
        amount : this.amount,
        price : this.menu.price,
        baseList: this.menu.baseList,
        toppingList: this.menu.toppingList,
        optionList: this.menu.optionList,
      };
      this.$emit('popup', obj);
    },
  }
})

const DEFAULT_MENU = {
  id: 1,
  name: "음식 이름",
  orderCount: 9,
  reviewPoint: 0.0,
  description: "불러오는 중",
  price: 0,
  imgUrl: "",
  pictures: [],
  reviews: [],
};