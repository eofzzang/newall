Vue.component('option-item', {
  template:`
    <li class="option-item">
      <label class="label" :class="{'checked':amount}">
        <span class="label-txt">
          info.name <span class="price">+{{info.price}}원</span>
        </span>
      </label>
      <!-- <select-button v-bind="optionInfo" @on-change="changeOn"></select-button> -->
    </li>
  `,
  props: [
    'option'
  ],
  data() {
    return {
      info: this.option,
      amount: 0,
      optionInfo: {
        max: Math.max(1, 5),
        min: 0,
      }
    }
  },
  methods: {
    changeOn(amount) {
      this.amount = amount;
    },
    onClick() {
      var obj = {

      };
      this.$emit('onChange', obj);
    }
  }
})