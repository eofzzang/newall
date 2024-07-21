Vue.component('top-button', {
  template:`
    <div class="go-to-top">
      <a @click="onClickTop" class="link">Top<i class="ico-up"></i></a>
    </div>
  `,
  methods: {
    onClickTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }
})