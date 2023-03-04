const apiUrl = 'https://vue3-course-api.hexschool.io/';
const apiPath = 'firebro42';

export default {
  //當ID變動時，取得遠端資料，並呈現 Modal
  props: ['id', 'addToCart', 'openModal'],
  data() {
    return {
      modal: {},
      temProduct: {},
      qty: 1,
    }
  },
  template: '#userProductModal',
  watch: {
    id() {
      if (this.id) {
        //console.log('productId', this.id);
        axios.get(`${apiUrl}v2/api/${apiPath}/product/${this.id}`)
          .then((res) => {
            this.temProduct = res.data.product;
            //取完資料後顯示 Modal
            this.qty = 0;
            this.modal.show();
          })
      }
    }
  },
  methods: {
    hide() {
      this.modal.hide();
    }
  },
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.modal);
    this.$refs.modal.addEventListener('hidden.bs.modal', (event) => {
      console.log('Modal關閉了');
      this.openModal('');
    })
  },
}