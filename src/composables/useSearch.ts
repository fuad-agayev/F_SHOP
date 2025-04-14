import { ref } from 'vue'

const searchQuery = ref('')

export function useSearch(){
  const setSearchQuery = (query: string) => {
      searchQuery.value = query
  }

  const searchProducts = (categories: any[]) => {
     const query = searchQuery.value.toLowerCase()
     if(!query) return []
     
     const results: any[] = []

     const searchInProducts = (products: any[]) => {
           return products.filter(product => product.name.toLowerCase().includes(query))
     }

     const searchInCategory = (category: any) => {
            // searv in main products 
            if(category.products){
                const found = searchInProducts(category.products)
                results.push(...found)
            }

            //  search in subcategories 
            if(category.subcategories){
              category.subcategories.forEach((subcat: any)=> {
                   if(subcat.products){
                    const found = searchInProducts(subcat.products)
                    results.push(...found)
                   }
                      // search in nested subcategories 
                   if(subcat.nested_subcategories){
                    subcat.nested_subcategories.forEach((nested: any)=> {
                       if(nested.products){
                        const found = searchInProducts(nested.products)
                        results.push(...found)
                       }

                       if(nested.deep_subcategories){
                        nested.deep_subcategories.forEach((deep: any)=> {
                              if(deep.products){
                                  const found = searchInProducts(deep.products)
                                  results.push(...found)
                              }
                        })
                       }
                    })
                   }
              })
            }
     }
     categories.forEach(searchInCategory)
     return results
  }

  return {
    searchQuery,
    setSearchQuery,
    searchProducts
  }
}