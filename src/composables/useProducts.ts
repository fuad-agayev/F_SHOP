import { ref, onMounted, computed } from 'vue'

interface Category {
 id: number
 name: string
 subcategories?: any[]
 products?: any[]
}

interface CategoriesResponse {
  categories: Category[]
}

export function useProducts() {
  const categories = ref<Category[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchCategories = async() => {
     loading.value = true
     try{
       const response = await fetch('/data/categories.json')
       const data:CategoriesResponse = await response.json()
       categories.value = data.categories
       //Simulate loading better UX
       await new Promise(resolve => setTimeout(resolve, 3000))
     }catch(err:any){
            error.value = err.message
     }
     finally{
      loading.value = false
     }
  }

  // Get all products from all categories and subcategories 
   const allProducts = computed(() => {
    const products: any[] = [];

    const extractProducts = (category: any) => {
            if(category.products){
              products.push(...category.products)
            }
            if(category.subcategories){
              category.subcategories.forEach((subcat: any) => {
                   if(subcat.products){
                     products.push(...subcat.products)
                   }
                 if(subcat.nested_subcategories){
                  subcat.nested_subcategories.forEach((nested: any)=>{
                     if(nested.products){
                        products.push(...nested.products)
                     }
                     if(nested.deep_subcategories){
                         nested.deep_subcategories.forEach((deep: any)=> {
                             if(deep.products){
                              products.push(...deep.products)
                             }
                         })
                     }
                  })
                 }
              })
            }
    }
    categories.value.forEach(extractProducts)
    return products
   })

   onMounted(()=> {
      fetchCategories()
   })
   return {
    categories,
    loading,
    allProducts,
    error
   }
}

