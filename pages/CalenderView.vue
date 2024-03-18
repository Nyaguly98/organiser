<template>
  <div class="q-pa-md">
    <div class="q-pb-sm">Model: {{ model }}</div>

    <q-date v-model="model" range />
  </div>
</template>
<script>
import { ref } from 'vue';

export default {
  setup() {
    return {
      model: ref({ from: '2020/07/08', to: '2020/07/17' }),
    };
  },
};
/*
2. Unter dem Kalender sollen die jeweiligen Aufgaben stehen die ncoh zu machen sind für den jeweiligen Monat
*/
</script>
