<template>
  <RadioGroup
    default-value="astra2018"
    class="flex flex-row"
    :modelValue="props.selectedCatalogId"
    @update:model-value="updateValue">
    <div class="flex items-center space-x-2">
      <RadioGroupItem id="r1" value="astra2018"/>
      <Label for="r1">Astra 2018</Label>
    </div>
    <div class="flex items-center space-x-2">
      <RadioGroupItem id="r2" value="astra2023"/>
      <Label for="r2">Astra 2023</Label>
    </div>
    <div class="flex items-center space-x-2">
      <RadioGroupItem id="r3" value="nobel"/>
      <Label for="r3">Nobel</Label>
    </div>
  </RadioGroup>
</template>

<script setup lang="ts">
  const props = defineProps<{
    selectedCatalogId: string
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
  }>()

  function updateValue(value: string) {
    emit('update:modelValue', value);
  }
</script>