<template>
  <div>
    <div v-if="order.length > 0">
      <Button @click="copyTextToClipboard">
        Copy
      </Button>

      <div class="h-full w-full whitespace-pre-line">
        {{ textareaOrderText }}
      </div>
    </div>
	
		<p v-else>
			No items from {{ company }} have been selected yet. Once selected, a separate order script for {{ company }}
			will be generated.
		</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  order: ImplantPart[],
  company: string;
}>()

const textareaOrderText = computed(() => {
  let countedOrderItems = props.order.reduce<Record<PartNumber, ImplantPart & { count: number }>>(
    (cummulativeOrder, itemToOrder) => {
      if (cummulativeOrder[itemToOrder.referenceNumber]) {
        cummulativeOrder[itemToOrder.referenceNumber].count += 1;
      } else {
        cummulativeOrder[itemToOrder.referenceNumber] = {
          ...itemToOrder,
          count: 1
        };
      }
      return cummulativeOrder;
    },
    {}
  );

  let text = `Please order the following ${props.company} implant parts:`;
  Object.keys(countedOrderItems).forEach((itemRefNumber) => {
    const item = countedOrderItems[parseInt(itemRefNumber)];
    text += `\nREF: ${item.referenceNumber} - ${item.title} x${item.count}`;
  });

  return text;
})

function copyTextToClipboard() {
  navigator.clipboard.writeText(textareaOrderText.value)
}
</script>