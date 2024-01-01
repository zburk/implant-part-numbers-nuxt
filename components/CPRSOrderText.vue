<template>
  <div class="space-y-5">
    <p v-if="astraOrderItems.length === 0 && nobelOrderItems.length === 0">
      No items from neither Astra nor Nobel have been selected yet. Once an item is selected, an
      order script will be generated here.
    </p>

    <div v-else class="space-y-5">
      <OrderForImplantCompany company="Astra Tech" :order="astraOrderItems" />
      <OrderForImplantCompany company="Nobel Biocare" :order="nobelOrderItems" />
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    order: PartNumber[]
  }>()

	const astraOrderItems = computed(() => {
    return props.order
			.map((implantPartReferenceNumber) => getAstraPart(implantPartReferenceNumber))
			.filter((implantPart): implantPart is ImplantPart => !!implantPart);
  });

	const nobelOrderItems = computed(() => {
    return props.order
			.map((implantPartReferenceNumber) => getNobelPart(implantPartReferenceNumber))
			.filter((implantPart): implantPart is ImplantPart => !!implantPart);
  });
</script>