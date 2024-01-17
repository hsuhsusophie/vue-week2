import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'sophie',
      products: [],
      tempProduct: {},
    }
  },
  methods: {
    checkAdmin() {
      const api = `${this.apiUrl}/api/user/check`;
      axios.post(api)
        .then(() => {
          this.getData();
        })
        .catch((err) => {
          alert('請重新登入，將轉回登入頁面');
          window.location = 'login.html';
        })
    },
    getData() {
      const api = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
      axios.get(api)
        .then((res) => {
          console.log(res);
          this.products = res.data.products;
        })
    },
    openProduct(item) {
      this.tempProduct = item;
    }
  },
  created() {
    // 取出 Token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;

    this.checkAdmin()
  }
}).mount('#app');