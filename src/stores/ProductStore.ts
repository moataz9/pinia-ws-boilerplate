// import products from '@/data/products.json'
import type { Product } from '@/types'

import { defineStore, acceptHMRUpdate } from 'pinia'

export const useProductStore = defineStore('ProductStore', {
  state: () => ({
    products: [] as Product[],
  }),
  // getters: {},
  actions: {
    async fill() {
      this.products = await fetch('src/data/products.json').then(res => res.json())
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
}
