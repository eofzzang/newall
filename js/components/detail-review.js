import { fetchGetMenu } from '../api/index.js'

Vue.component('detail-review', {
  template:`
    <div class="menu-review-area">
      <!-- 주문자사진 -->
      <div class="orderer-img-area">
        <div class="common-inner">
          <div class="title">주문자 사진<span class="num">{{review.pictures.length}}</span></div>
          <div class="scroll-x">
            <ul class="orderer-pic-list">
              <li class="orderer-pic-item" v-for="i in review.pictures.length">
                <a class="orderer-pic-link">
                  <img src="https://via.placeholder.com/104/fff/000" alt="">
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- // 주문자사진 -->
      <!-- 주문자리뷰 -->
      <div class="orderer-review-area">
        <div class="common-inner">
          <div class="title">주문자 리뷰<span class="num">{{review.reviews.length}}</span></div>
          <ul class="review-list">
            <li class="review-item" v-for="item in review.reviews">
              <div class="review-star">
                <span class="ico-star-group">
                  <span class="ico-star-group-fill"></span>
                </span>
                <span class="point">{{item.reviewPoint}}</span>
              </div>
              <p class="review-text">{{item.content}}</p>
                <div class="review-info">
                  <span class="review-nickname">{{item.reviewrId}}</span>
                  <span class="review-date">{{item.orderDate}} 주문</span>
                </div>
            </li>
          </ul>

          <!-- <button class="btn-more">더보기</button> -->
        </div>
      </div>
      <!-- // 주문자리뷰 -->
    </div>
  `,
  mounted() {
    const [menuId] = window.location.pathname.split('/').splice(-1);
    fetchGetMenu(menuId).then((response) => this.review = response[0]);
  },
  data() {
    return {
      review: [],
    }
  }
})