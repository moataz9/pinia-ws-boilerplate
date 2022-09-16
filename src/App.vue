<script setup>
import TheHeader from '@/components/TheHeader.vue'
import ProductCard from '@/components/ProductCard.vue'

// import stores
import { useProductStore } from '@/stores/ProductStore'
import { useCartStore } from '@/stores/CartStore'
import { storeToRefs } from 'pinia'

const { products } = storeToRefs(useProductStore())
const { addItem } = useCartStore()
useProductStore().fill()
</script>

<template>
  <div class="container">
    <TheHeader />
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5 mt-2">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @addToCart="addItem(product.id, $event)"
      />
    </ul>
  </div>
</template>
