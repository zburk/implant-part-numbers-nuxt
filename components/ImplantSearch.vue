<template>
  <ImplantCatalogs
    :selectedCatalogId="selectedCatalogId"
    @update:model-value="(newValue) => selectedCatalogId = newValue" />

  <div class="py-1 flex flex-row flex-wrap gap-1">
    <ImplantQuickSearchButtons @update:model-value="(newValue) => searchText = newValue" />
  </div>

  <Input type="text" placeholder="Search for Implant Parts" v-model="searchText" />

  <ul>
    <li v-for="implantItem in searchResults">
      <div class="bg-transparent flex w-full flex-row items-center space-x-2 rounded-md p-2 text-left text-slate-900">
        <Button 
          class="rounded-md p-[0.125rem] bg-green-700 h-full"
          @click="addItemToOrder(implantItem.referenceNumber)">
          <Plus class="text-white" :size="16" />
        </Button>

        <Button 
          :class="{ 'invisible': !itemInOrder(implantItem.referenceNumber) }"
          class="block flex-none rounded-md p-[0.125rem] bg-red-700 h-full"
          @click="removeItemFromOrder(implantItem.referenceNumber)">
          <Minus class="text-white" :size="16" />
        </Button>

        <span class="flex-1">REF: {{implantItem.referenceNumber}} - {{implantItem.title}}</span>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { Plus, Minus } from 'lucide-vue-next';
import MiniSearch from 'minisearch'
import astra2018Catalog from '~/utils/data/astra2018.json'
import astra2023Catalog from '~/utils/data/astra2023.json'
import nobelCatalog from '~/utils/data/nobel.json'

const props = defineProps<{
  order: PartNumber[]
}>()

const selectedCatalogId = ref('astra2018')

const catalogs = [
  {
    id: 'astra2018',
    title: 'Astra 2018',
    catalog: astra2018Catalog
  },
  {
    id: 'astra2023',
    title: 'Astra 2023',
    catalog: astra2023Catalog
  },
  {
    id: 'nobel',
    title: 'Nobel',
    catalog: nobelCatalog
  }
];

const implantPartsDatabase = computed(() => {
  return catalogs.find(catalog => catalog.id === selectedCatalogId.value) ?? catalogs[0]
})

const searchText = ref('')

const describedImplantParts = computed(() => {
  const database = implantPartsDatabase.value.catalog;
  return database.map((implantPart) => {
		const newPart = { ...implantPart, description: '' };
		if (implantPart.title.includes('HealDesign')) {
			newPart.description = 'Healing Abutment';
		} else if (implantPart.title.includes('Astra Tech Implant EV')) {
			newPart.description = 'Implant';
		} else if (implantPart.title.includes('Implant Pick-Up')) {
			newPart.description = 'Open tray';
		} else if (implantPart.title.includes('Implant Transfer')) {
			newPart.description = 'Closed tray';
		} else if (implantPart.title.includes('Implant Replica')) {
			newPart.description = 'analog';
		} else if (implantPart.title.includes('Atlantis')) {
			newPart.description = 'scan body';
		}

		return newPart;
	});
})

let miniSearch = reactive(new MiniSearch({
  fields: ['referenceNumber', 'title', 'description'],
  storeFields: ['referenceNumber', 'title', 'description'],
  idField: 'referenceNumber'
}));

watch(describedImplantParts, () => {
  miniSearch.removeAll();
	miniSearch.addAll(describedImplantParts.value);
}, { immediate: true });

const searchResults = computed(() => {
  return miniSearch.search(searchText.value, { fuzzy: 0.2 });
});

function addItemToOrder(itemReferenceNumber: PartNumber) {
  props.order.push(itemReferenceNumber);
}

function removeItemFromOrder(itemReferenceNumber: PartNumber) {
  const index = props.order.indexOf(itemReferenceNumber);
  props.order.splice(index, 1);
}

function itemInOrder(itemReferenceNumber: PartNumber) {
  return props.order.includes(itemReferenceNumber);
}
</script>