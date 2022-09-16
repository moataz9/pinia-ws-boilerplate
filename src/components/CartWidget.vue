<script setup>
// imports
import { ref } from 'vue'
import CartItem from './CartItem.vue'

import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/CartStore'
import { useProductStore } from '@/stores/ProductStore'

const { cartItems, cartCount, isEmpty, cartTotal } = storeToRefs(useCartStore())
const { clearCart, addItem } = useCartStore()
const { products } = storeToRefs(useProductStore())

// data
const active = ref(false)
</script>
<template>
  <div class="relative">
    <!-- Icon that always shows -->
    <span class="cursor-pointer" @click="active = true">
      <fa icon="shopping-cart" size="lg" class="text-gray-700" />
      <div class="cart-count absolute">{{ cartCount }}</div>
    </span>
    <!-- Modal Overlay only shows when cart is clicked on -->
    <AppModalOverlay :active="active" @close="active = false">
      <div v-if="!isEmpty">
        <ul class="items-in-cart">
          <CartItem
            v-for="item in cartItems"
            :key="item.id"
            :product="products.find(p => item.id === p.id)"
            :count="item.count"
            @updateCount="addItem(item.id, $event)"
            @clear="addItem(item.id, 0)"
          />
        </ul>
        <div class="flex justify-end text-2xl mb-5">
          Total: <strong>${{ cartTotal }}</strong>
        </div>
        <div class="flex justify-end">
          <AppButton @click="clearCart" class="secondary mr-2">
            Clear Cart
          </AppButton>
          <AppButton class="primary">Checkout</AppButton>
        </div>
      </div>
      <div v-else><em>Cart is Empty</em></div>
    </AppModalOverlay>
  </div>
</template>
<style lang="pcss" scoped>
.items-in-cart{
  @apply mb-5;
}
.items-in-cart li{
  @apply flex justify-between p-2;
}
.items-in-cart li:nth-of-type(even){
  @apply bg-gray-300;
}
</style>
