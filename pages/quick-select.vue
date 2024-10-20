<template>
  <div class="min-h-screen">
    <h1>I Want To Place...</h1>
    <RadioGroup
      default-value="astraOsseoSpeedEv"
      class="flex flex-row"
      v-model="selectedImplantSystemId">
      <div class="flex items-center space-x-2">
        <RadioGroupItem id="r1" value="astraOsseoSpeedEv"/>
        <Label for="r1">Astra OsseoSpeed EV</Label>
      </div>
      <div class="flex items-center space-x-2">
        <RadioGroupItem id="r2" value="nobelActive"/>
        <Label for="r2">NobelActive</Label>
      </div>
      <div class="flex items-center space-x-2">
        <RadioGroupItem id="r3" value="zimVieT3Pro"/>
        <Label for="r3">ZimVie T3 Pro</Label>
      </div>
      <div class="flex items-center space-x-2">
        <RadioGroupItem id="r4" value="astraPrimeTaper"/>
        <Label for="r4">Astra PrimeTaper</Label>
      </div>
    </RadioGroup>

    <h1>{{ selectedImplantAndSize }}</h1>
    <div>
      <h2>Size</h2>
      <RadioGroup
        default-value="3.6"
        class="flex flex-row"
        v-model="selectedImplantSize">
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="3.6" value="3.6"/>
          <Label for="3.6">3.6</Label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="4.2" value="4.2"/>
          <Label for="4.2">4.2</Label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="4.8" value="4.8"/>
          <Label for="4.8">4.8</Label>
        </div>
        <div class="flex items-center space-x-2">
          <RadioGroupItem id="5.4" value="5.4"/>
          <Label for="5.4">5.4</Label>
        </div>
      </RadioGroup>
    </div>

    <div>
      <h2>Surgery</h2>
      <h3>Free Hand Drills</h3>
      <h3>Guided Drills</h3>
      <h3>Cover Screw</h3>
      <h3>Healing Abutment</h3>
    </div>

    <div>
      <h2>Restorative</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
  const implantSystems = [
    {
      id: 'astraOsseoSpeedEv',
      title: 'Astra OsseoSpeed EV'
    },
    {
      id: 'nobelActive',
      title: 'Nobel Active'
    },
    {
      id: 'zimVieT3Pro',
      title: 'ZimVie T3 Pro'
    },
    {
      id: 'astraPrimeTaper',
      title: 'Astra Prime Taper'
    },
  ];

  const selectedImplantSystemId = ref(implantSystems[0]?.id ?? 'astraOsseoSpeedEv')

  const selectedImplant = computed(() => {
    return implantSystems.find(implantSystem => implantSystem.id === selectedImplantSystemId.value) ?? implantSystems[0]
  })

  const selectedImplantSize = ref("")

  const selectedImplantAndSize = computed(() => {
    return selectedImplant.value.title + " " + selectedImplantSize.value
  })
</script>