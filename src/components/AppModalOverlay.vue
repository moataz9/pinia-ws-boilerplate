<script setup>
defineProps({
  active: { type: Boolean, default: false },
});

defineEmits(["close"]);
</script>
<template>
  <div v-if="active" class="modal-overlay" style="z-index: 100;">
    <div class="modal-overlay-bg" @click="$emit('close')"></div>
    <div class="modal-overlay-content">
      <span class="close" @click="$emit('close')">
        <fa icon="window-close" class="text-gray-700" />
      </span>
      <slot></slot>
    </div>
  </div>
</template>

<style lang="pcss" scoped>
.close{
  @apply absolute top-2 right-2;
  cursor: pointer;
}
.modal-overlay-bg{
  @apply fixed top-0 left-0 right-0 bottom-0 bg-gray-900 opacity-80;
  z-index: 1;
}
.modal-overlay-content{
  @apply fixed bg-white p-10 w-4/5 rounded;
  top: 50%;
  left:50%;
  transform: translate(-50%, -50%);
  z-index: 3;
}
@media (min-width: 800px){
  .modal-overlay-content{
    width:600px !important;
  }
}
</style>
