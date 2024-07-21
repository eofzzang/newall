import './components/header.js'
import './components/menu.js'
import './components/menu-category.js'

import './components/detail.js'
import './components/detail-review.js'
import './components/detail-popup.js'
import './components/order.js'

import './components/option-item.js'
import './components/amount-select.js'
import './components/top-button.js'

var app = new Vue({
  el:'#app',
  data() {
    return {
      pageName: 'index.html',
      orderType: 0,
      menuItem: {name:'돈까스 덮밥',orderTypeText:'포장',amount:1, price:1, optionList:[]},
      selectItem: {},
      isPopup: false,
    }
  },
  methods: {
    changeOrderType(e) {
      this.orderType = e.idx;
      this.menuItem.orderTypeTextDescription = e.text;
    },
    popupOpen(menu) {
      this.menuItem.name = menu.name;
      this.menuItem.description = menu.description;
      this.menuItem.imgUrl = menu.imgUrl;
      this.menuItem.orderTypeText = menu.orderTypeText;
      this.menuItem.amount = menu.amount;
      this.menuItem.price = menu.price;
      this.menuItem.baseList = menu.baseList;
      this.menuItem.toppingList = menu.toppingList;
      this.menuItem.optionList = menu.optionList;

      document.querySelector('body').classList.add('scroll-off');
      document.querySelector('.option-popup-area').classList.add('show');
    },
    popupClose() {
      document.querySelector('body').classList.remove('scroll-off');
      document.querySelector('.option-popup-area').classList.remove('show');
    },
    orderItems(e) {
      this.selectItem = e;
    }
  }
})

window.onpopstate = () => {
  let [, page] = location.pathname.split('/');
  if (page == 'newall') page = 'index.html'
  app.pageName = page;
};