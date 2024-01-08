<template>
<Button
  variant="default"
  v-for="quickSearchOption in quickSearchButtons"
  @click="$emit('update:modelValue', quickSearchOption.searchKey)">
  {{ quickSearchOption.title }}
</Button>
</template>

<script setup lang="ts">
const quickSearchButtons = [
  {
    title: 'Implant Fixture',
    searchKey: 'implant'
  },
  {
    title: 'Healing Abutment',
    searchKey: 'healing abutment'
  },
  {
    title: 'Open Tray Impression',
    searchKey: 'open tray'
  },
  {
    title: 'Closed Tray Impression',
    searchKey: 'closed tray'
  },
  {
    title: 'Implant Analog',
    searchKey: 'analog'
  },
  {
    title: 'Scan Body',
    searchKey: 'scan body'
  }
];
</script>