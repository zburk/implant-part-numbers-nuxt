<template>
  <div class="min-h-screen">
    <div class="flex flex-col md:flex-row md:space-x-6">
      <div class="order-last mt-10 space-y-2 md:order-1 md:mt-0 md:w-1/2">
        <RadioGroup default-value="astra2018" v-model="selectedCatalogId" class="flex flex-row">
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

        <div class="py-1 flex flex-row flex-wrap gap-1">
          <Button
            variant="default"
            v-for="quickSearchOption in quickSearchButtons"
            @click="searchText = quickSearchOption.searchKey">
            {{ quickSearchOption.title }}
          </Button>
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
      </div>
      <div class="order-2 flex-1">
        <CPRSOrderText :order="order" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Minus } from 'lucide-vue-next';
import MiniSearch from 'minisearch'
import astra2018Catalog from '~/utils/data/astra2018.json'
import astra2023Catalog from '~/utils/data/astra2023.json'
import nobelCatalog from '~/utils/data/nobel.json'

const searchText = ref('')
const selectedCatalogId = ref('astra2018')

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

let catalogs = [
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
  fields: ['referenceNumber', 'title', 'description'], // fields to index for full-text search
  storeFields: ['referenceNumber', 'title', 'description'], // fields to return with search results
  idField: 'referenceNumber'
}));

watch(describedImplantParts, () => {
  miniSearch.removeAll();
	miniSearch.addAll(describedImplantParts.value);
}, { immediate: true });

const searchResults = computed(() => {
  return miniSearch.search(searchText.value, { fuzzy: 0.2 });
});

const order: Ref<PartNumber[]> = ref([])
function addItemToOrder(itemReferenceNumber: PartNumber) {
  order.value.push(itemReferenceNumber);
}

function removeItemFromOrder(itemReferenceNumber: PartNumber) {
  const index = order.value.indexOf(itemReferenceNumber);
  order.value.splice(index, 1);
}

function itemInOrder(itemReferenceNumber: PartNumber) {
  return order.value.includes(itemReferenceNumber);
}

</script>