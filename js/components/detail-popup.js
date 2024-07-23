Vue.component('detail-popup', {
  template:`
    <div class="option-popup-area">
      <div class="dimmed-layer light"></div>
      <div class="menu-option-popup">
        <svg class="content-top-pattern" width="100%" height="100%">
          <defs>
              <pattern id="pattern-triangle" x="0" y="0" width="10" height="11" patternUnits="userSpaceOnUse">
                  <polygon points="5 5, 10 10, 10 11, 0 11, 0 10"></polygon>
              </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-triangle)"></rect>
        </svg>

        <div class="content-top">
          <div class="common-inner">
            <div class="menu-img-area">
              <img src="https://via.placeholder.com/70/fff/000" alt="" class="menu-img">
            </div>
            <div class="menu-detail-area">
              <p class="menu-name">
                <span class="name">{{info.name}}</span>
                <span class="badge">{{info.orderTypeText}}</span>
              </p>
              <div class="amount-select">
                <button class="btn-minus" :class="info.amount == 1 ? 'disabled':'enabled'" aria-label="빼기" @click="onDecrease"></button>
                <span class="amount">{{info.amount}}</span>
                <button class="btn-plus enabled" aria-label="더하기" @click="onIncrease"></button>
              </div>
            </div>
            <button class="btn-close" @click="onClickClose">
              <img src="/newall/assets/images/ico-close.svg" alt="" class="ico-close">
            </button>
          </div>
        </div>

        <div class="content-body">
          <div class="option-group">
            <div class="option-title">
              <p class="title">
                <span class="badge required">필수</span>
                <span class="text">베이스 선택</span>
              </p>
            </div>
            <ul class="option-list">
              <li class="option-item" v-for="e,i in info.baseList">
                <input type="radio" :id="'rd'+i" class="input-radio" name="base" :checked="i == 0">
                <label :for="'rd'+i" class="label">
                  <span class="label-txt">{{e}}</span>
                  <span class="label-icon"></span>
                </label>
              </li>
            </ul>
          </div>

          <div class="option-group">
            <div class="option-title">
              <p class="title">
                <span class="badge">선택</span>
                <span class="text">토핑추가</span>
              </p>
              <p class="desc">최대 5개까지 선택할 수 있습니다.</p>
            </div>
            <ul class="option-list">
              <li class="option-item" v-for="e,i in info.toppingList">
                <input type="checkbox" :id="'chk'+i" class="input-check" @click="onClickTopping(e,i)">
                <label :for="'chk'+i" class="label">
                  <span class="label-txt">{{e.name}} <span class="price">+{{e.price.toLocaleString('ko-KR')}}원</span></span>
                  <span class="label-icon"></span>
                </label>
              </li>
            </ul>
          </div>

          <div class="option-group">
            <div class="option-title">
              <p class="title">
                <span class="badge">선택</span>
                <span class="text">옵션추가</span>
              </p>
              <p class="desc">최대 5개까지 선택할 수 있습니다.</p>
            </div>
            <ul class="option-list">
              <li class="option-item" v-for="option,i in info.optionList">
                <label class="label" :class="option.amount == 0 ? '':'checked'">
                  <span class="label-txt">
                    {{option.name}} <span class="price">+{{option.price}}원</span>
                  </span>
                </label>
                <select-button v-bind="{i:i,stock:option.stock}" @change="changeOn"></select-button>
              </li>
            </ul>
          </div>
        </div>

        <div class="content-bottom">
          <button class="btn-order" @click="onClickOrder">{{info.amount}}개 담기 {{totalPrice}}원</button>
        </div>
      </div>
    </div>
  `,
  props: [
    'item'
  ],
  data() {
    return {
      info: this.item,
      extraPrice: 0,
    }
  },
  computed: {
    totalPrice() {
      return (this.info.amount * this.info.price + this.extraPrice).toLocaleString('ko-KR');
    }
  },
  methods: {
    onDecrease() {
      if (this.info.amount > 1) this.info.amount--;
    },
    onIncrease() {
      this.info.amount = this.info.amount + 1;
    },
    onClickTopping(e,i) {
      if (document.querySelector('#chk'+i).checked) {
        e.checked = true;
        this.extraPrice += e.price;
      } else {
        delete e.checked;
        this.extraPrice -= e.price;
      }
    },
    changeOn(e) {
      var changeAmount = e.amount - this.info.optionList[e.idx].amount;
      var changePrice = this.info.optionList[e.idx].price * changeAmount;
      this.extraPrice += changePrice;
      this.info.optionList[e.idx].amount += changeAmount;
      if (this.info.optionList[e.idx].amount == 0) {
        delete this.info.optionList[e.idx].checked;
      } else {
        this.info.optionList[e.idx].checked = true;
      }
    },
    onClickClose() {
      this.$emit('popclose');
    },
    onClickOrder() {
      this.info.extraPrice = this.extraPrice;
      this.$emit('orderitem', this.info);
      document.querySelector('body').classList.remove('scroll-off')
      history.pushState(null, null, '/order/');
      dispatchEvent(new PopStateEvent('popstate'));
    }
  }
})