export default {
  //props 外部資料 傳入 內部
    props: ['pages','getProducts'],
    template: `
    <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item"
      :class="{ disabled : !pages.has_pre }">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="getProducts(pages.current_page-1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <li class="page-item"
        :class="{ active : page === pages.current_page }"
        v-for="page in pages.total_pages" :key="page + 'page'"> 
      <a class="page-link" href="#" 

      @click.prevent="$emit('change_page',page) ">
      {{page}} 
      </a> 
      </li>

      <li class="page-item"
      :class="{ disabled : !pages.has_next }">
        <a class="page-link" href="#" aria-label="Next" @click.prevent="getProducts(pages.current_page+1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>`
}

//props方法: @click.prevent="getProducts(page)

//emit 方法: @click.prevent="$emit('change_page',page) 自訂譯名稱 ,參數
//html 使用 @change_page= "根元件methods"