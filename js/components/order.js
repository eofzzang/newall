import { fetchGetAgreementList } from '../api/index.js'

Vue.component('order',{
  template:`
  <div class="container order">
    <div class="order-form-area">
      <!-- 주문서 타이틀 -->
       <div class="page-title-area">
        <p class="title">주문서</p>
        <button class="btn-close">
          <img src="./assets/images/ico-close-white.svg" alt="닫기" class="ico-close">
        </button>
       </div>
      <!-- //주문서 타이틀 -->

      <!-- 주문서 메뉴 -->
       <div class="order-content">
        <div class="common-inner">
          <div class="order-content-top">
            <p class="title">{{info.orderTypeText}}
              <svg width="18" height="18" viewBox="0 0 12 12" class="ico-takeout">
                <path fill="currentColor" fill-rule="evenodd"
                    d="M3.558 3.997a21.21 21.21 0 00-.014.682 1.194 1.194 0 101.495 1.155c0-.42-.223-.811-.582-1.025.005-.372.012-.645.018-.77.01-.186.022-.37.037-.548h2.976c.016.175.028.358.038.546.006.125.013.398.018.772a1.194 1.194 0 00.611 2.218 1.194 1.194 0 00.304-2.348c-.003-.218-.007-.49-.01-.573-.011-.228-.024-.43-.039-.615h2.102c.346 0 .629.275.629.612a.628.628 0 01-.01.102l-.782 6.443a.623.623 0 01-.62.512H2.3a.622.622 0 01-.619-.51L.869 4.203a.595.595 0 01.104-.449.627.627 0 01.516-.263h2.102c-.013.153-.023.32-.033.506zm1.058-1.345C4.774 1.708 5.057.844 6 .844c.942 0 1.226.864 1.384 1.808h-2.77zm5.896 0H8.314C8.03.768 7.357 0 6.001 0 4.64 0 3.969.768 3.686 2.652H1.489c-.081 0-.164.006-.244.02-.4.065-.746.278-.978.602-.223.313-.31.691-.246 1.066l.811 6.447C.952 11.49 1.57 12 2.3 12h7.43c.73 0 1.346-.509 1.467-1.214l.782-6.443c.015-.078.021-.159.021-.24 0-.8-.667-1.45-1.488-1.45z">
                </path>
            </svg>
            </p>
            <p class="desc">{{info.orderTypeTextDescription}}</p>
            <p class="count">담은 메뉴: {{info.amount}}개</p>
          </div>

          <div class="order-content-body">
            <!-- 담은 메뉴 없음 -->
            <div class="no-order hidden">
              <img src="./assets/images/ico-exclaim.svg" alt="" aria-hidden="true">
              <p class="txt">담은 메뉴가 없습니다.</p>
            </div>
            <!-- // 담은 메뉴 없음 -->

            <!-- 담은 메뉴 있음 -->
            <ul class="menu-list">
              <li class="menu-item">
                <div class="menu-img-area">
                  <img :src="info.imgUrl || defaultUrl" :alt="info.name" class="menu-img" width="74" height="74">
                </div>
                <div class="menu-info-area">
                  <p class="menu-name-group">
                    <span class="menu-name">{{info.name}}</span>
                  </p>
                  <p class="menu-desc">{{info.description}}</p>
                  <button class="btn-option" @click="onAlert">옵션변경</button>
                  <div class="amount-and-price">
                    <select-button :init="info.amount" @change="changeAmount"></select-button>
                    <!-- <div class="amount-select">
                      <button class="btn-minus enabled" aria-label="빼기"></button>
                      <span class="amount">2</span>
                      <button class="btn-plus enabled" aria-label="더하기"></button>
                    </div> -->
                    <p class="menu-price">{{moneyFormat(totalPrice)}}원</p>
                  </div>
                </div>
                <button class="btn-delete">
                  <img src="./assets/images/ico-close.svg" alt="삭제" class="ico-delete">
                </button>
              </li>
              
              <!-- <li class="menu-item">
                <div class="menu-img-area">
                  <img src="https://via.placeholder.com/74/ffffff/0000000" alt="{메뉴명}" class="menu-img" width="74" height="74">
                </div>
                <div class="menu-info-area">
                  <p class="menu-name-group">
                    <span class="menu-name">메뉴이름</span>
                  </p>
                  <p class="menu-desc">메뉴에 대한 간단한 설명이 적혀있습니다 메뉴에 대한 간단한 설명이 적혀있습니다</p>
                  <button class="btn-option">옵션변경</button>
                  <div class="amount-and-price">
                    <div class="amount-select">
                      <button class="btn-minus disabled" aria-label="빼기" onClick="modalOpen()"></button>
                      <span class="amount">1</span>
                      <button class="btn-plus" aria-label="더하기"></button>
                    </div>
                    <p class="menu-price">9,999원</p>
                  </div>
                </div>
                <button class="btn-delete">
                  <img src="./assets/images/ico-close.svg" alt="삭제" class="ico-delete">
                </button>
              </li> -->
            </ul>

            <div class="order-total">
              <span class="total-txt">총 주문금액</span>
              <span class="total-price">{{moneyFormat(totalPrice)}}원</span>
            </div>
            <!-- // 담은 메뉴 있음 -->
          </div>
        </div>
        <a @click="onAlert" class="btn-menu-add"><i class="ico-add"></i>메뉴추가</a>
      </div>

      <!-- // 주문서 메뉴 -->

      <!-- 주문자 정보 -->
      <div class="order-content-extra">
        <div class="common-inner">
          <div class="orderer-info-area">
            <p class="title">주문자 정보</p>
            <ul class="info-list">
              <li class="info-item">
                <p class="info-title">일회용 수저, 포크</p>
                <div class="option-group">
                  <div class="option-item">
                    <input type="radio" id="need" class="input-radio" name="disposables" checked>
                    <label for="need" class="input-radio-button need">필요해요</label>
                  </div>
                  <div class="option-item">
                    <input type="radio" id="no-need" class="input-radio" name="disposables">
                    <label for="no-need" class="input-radio-button no-need">필요 없어요</label>
                  </div>
                </div>
              </li>
              <li class="info-item">
                <p class="info-title">요청사항</p>
                <input type="text" placeholder="(선택) 요청사항을 입력해 주세요." class="input-text">
              </li>
              <li class="info-item">
                <p class="info-title">주문자 연락처<span class="fw700 color-point">(필수)</span></p>
                <input v-model="phoneNumber" id="phone" type="text" placeholder="연락처를 입력해 주세요." class="input-text" required>
              </li>
            </ul>
          </div>

          <div class="place-map-area">
            <p class="title">주문 매장 위치</p>
            <div class="map-area">
              <div class="place-address-box">
                <p class="place-name">샐러드 제로베이스점</p>
                <p class="place-address">서울시 강남구 역삼동</p>
                <p class="place-address-detail">역삼역 8번 출구로 나와서 직진 410m</p>
              </div>
              <img src="https://via.placeholder.com/400x170?text=map image" alt="" class="img-map">
            </div>
          </div>

          <div class="agreement-area">
            <p class="title">개인정보 수집, 제공</p>

            <ul class="agreement-list">
              <li class="agreement-item" :class="agreeItem.checked ? 'is-open' : '' " @click="onClickAgreeList(agreeItem)" v-for="agreeItem in agreementList">
                <div class="agreement-title">
                  <span class="txt">{{agreeItem.title}}</span>
                  <button class="btn-toggle">
                    <img src="./assets/images/ico-arrow-gray.svg" alt="">
                  </button>
                </div>
                <div class="agreement-content">
                  <span v-html="agreeItem.content"></span>
                </div>
              </li>
            </ul>

            <p class="agreement-info-txt">주문 서비스 이용을 위한 개인정보 수집 및 제3자 제공, 취소/환불 규정을 확인하였으며 이에 동의합니다.</p>
          </div>
        </div>
      </div>
      <!-- // 주문자 정보 -->

      <!-- 주문하기 버튼-->
      <div class="btn-order-area">
        <button class="btn-order" @click="onClickOrder">
          <svg viewBox="0 0 18 18" width="18" height="18" class="ico-n-logo">
            <path fill-rule="evenodd" fill="currentColor"
                d="M18 0v18H0V0h18zM7.255 4.582H4.473v9.054h2.915V8.79l3.357 4.846h2.782V4.582h-2.915v4.846L7.255 4.582z">
            </path>
          </svg> 주문하기
        </button>
      </div>
      <!-- // 주문하기 버튼-->

      <!-- 맨위로 -->
      <top-button></top-button>
      <!-- //맨위로 -->
    </div>

    <!-- 모달 -->
    <div class="modal-wrapper" :class=" completeOrder ? '' : 'hidden' ">
      <div class="dimmed-layer light"></div>
      <div class="modal-container">
        <div class="modal-content">
          <button class="btn-close" @click="modalClose">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 2L14 14" stroke="#999" stroke-width="1.5" />
              <path d="M2 14L14 2" stroke="#999" stroke-width="1.5" />
            </svg>
          </button>
          <div class="modal icon">
            <svg viewBox="0 0 32 32" width="38" height="38">
              <path fill="currentColor"
                  d="M15,8H17c0.6,0,1-0.4,1-1s-0.4-1-1-1H15c-0.6,0-1,0.4-1,1S14.4,8,15,8z" />
              <path fill="currentColor"
                  d="M29.9,20.5C29.7,20.2,29.3,20,29,20h-1.1c-0.5-4.4-4.1-8.8-8.7-10.2c-2.1-0.7-4.4-0.7-6.5,0C8.2,11.2,4.5,15.6,4.1,20H3   c-0.3,0-0.7,0.2-0.9,0.5s-0.2,0.7,0,1C3.5,24.3,6.3,26,9.5,26h13.1c3.1,0,6-1.7,7.4-4.6C30,21.1,30,20.8,29.9,20.5z M13.3,11.7   c1.7-0.5,3.6-0.5,5.3,0c3.7,1.1,6.8,4.7,7.3,8.3H6.1C6.6,16.4,9.6,12.9,13.3,11.7z M22.5,24H9.5c-1.8,0-3.4-0.7-4.6-2h22.2   C25.9,23.3,24.3,24,22.5,24z" />
            </svg>
          </div>
          <h1 class="modal-title">주문완료</h1>
          <p class="modal-desc">주문이 완료되었습니다.</p>
        </div>
        <div class="btn-area">
          <!-- <button class="btn-cancel" onClick="modalClose()">취소</button> -->
          <button class="btn-confirm" @click="modalClose">확인</button>
        </div>
      </div>
    </div>
    <!-- // 모달 -->
  </div>
  `,
  props: ['item'],
  computed: {
    totalPrice() {
      return (this.info.price + this.info.extraPrice) * this.info.amount;
    }
  },
  mounted() {
    fetchGetAgreementList().then(function(response) {
      response.forEach(function(x){
        x.checked = false;
      })
      response[0].checked = true;
      this.agreementList = response;
    }.bind(this));
  },
  data() {
    return {
      info : this.item,
      defaultUrl : 'https://via.placeholder.com/74/ffffff/0000000',
      agreementList : [],
      completeOrder : false,
      phoneNumber : '',
    }
  },
  methods: {
    changeAmount(obj) {
      this.info.amount = obj.amount;
    },
    onAlert() {
      alert('준비중입니다..');
    },
    moneyFormat(money) {
      return money.toLocaleString('ko-KR');
    },
    onClickAgreeList(e) {
      e.checked = !e.checked;
    },
    onClickOrder() {
      if (this.validCheck()) return;
      this.completeOrder = true;
    },
    validCheck() {
      if (this.totalPrice == 0) {
        alert('주문내용이 없습니다.');
        return true;
      }

      if (!this.phoneNumber) {
        alert('연락처를 입력해주세요.');
        document.querySelector('#phone').focus();
        return true;
      }

      return false;
    },
    modalClose() {
      //window.location.replace('https://newall.shop/index.html');
      history.pushState(null, null, '/newall/index.html');
      dispatchEvent(new PopStateEvent('popstate'));
    }
  }
})