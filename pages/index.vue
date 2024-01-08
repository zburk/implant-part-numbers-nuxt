<template>
  <div class="min-h-screen">
    <div class="flex flex-col md:flex-row md:space-x-6">
      <div class="order-last mt-10 space-y-2 md:order-1 md:mt-0 md:w-1/2">
        <ImplantSearch :order="order" />
      </div>
      <div class="order-2 flex-1">
        <CPRSOrderText :order="order" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const order: Ref<PartNumber[]> = ref([])
</script>