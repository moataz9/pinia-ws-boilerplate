// import cartItems from '@/data/cart.json'
import type { CartItem, Uid } from '@/types'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { useProductStore } from './ProductStore'

export const useCartStore = defineStore('CartStore', {
  state: () => ({
    items: [] as CartItem[],
  }),
  actions: {
    addItem(itemId: Uid, count: number) {
      const item = this.items.find(item => item.id === itemId)
      if (item) {
        item.count >= 0 ? (item.count += count) : item.count++
      } else {
        this.items.push({ id: itemId, count })
      }
    },
    clearCart() {
      this.items.splice(this.items.length)
    },
  },
  getters: {
    cartCount(state): number {
      return state.items.reduce((total, item) => item.count + total, 0)
    },
    isEmpty(): boolean {
      return this.cartCount === 0
    },
    cartTotal(): number {
      const productStore = useProductStore()
      return this.items
        .map((item: CartItem) => {
          const product = productStore.products.find(p => p.id === item.id)
          return product ? item.count * product?.price : 0
        })
        .reduce((prev, item) => prev + item, 0)
    },
    cartItems(state) {
      return state.items.filter(i => i.count !== 0)
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
