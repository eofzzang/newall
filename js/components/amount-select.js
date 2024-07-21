Vue.component('select-button', {
  template:`
    <div class="amount-select">
      <button class="btn-minus" :class="amount == minimum ? 'disabled':'enabled'" aria-label="빼기"
        @click="onClickDecrease"></button>
      <span class="amount">{{amount}}</span>
      <button class="btn-plus" :class="amount == maximum ? 'disabled':'enabled'" aria-label="더하기" 
        @click="onClickIncrease"></button>
    </div>
  `,
  props: [
    'i','stock','init'
  ],
  data() {
    return {
      idx: this.i,
      amount: this.init || 0,
      minimum: 0,
      maximum: Math.min(5, (this.stock || 5))
    }
  },
  methods: {
    onClickDecrease() {
      if (this.amount > this.minimum) {
        this.amount--;
        var obj = {
          idx: this.idx,
          amount: this.amount
        }
        this.$emit('change', obj);
      }
    },
    onClickIncrease() {
      if (this.amount < this.maximum) {
        this.amount++;
        var obj = {
          idx: this.idx,
          amount: this.amount
        }
        this.$emit('change', obj);
      }
    }
  }
})