<script setup lang="ts">
import {inject, reactive, ref, watch} from 'vue';
import {ExtractedPerk, Perk} from './types';

const perks: Perk[] = reactive(inject<ExtractedPerk[]>('perks', []).map(perk => ({...perk, selected: false})));
const output = ref('');

watch(
    perks,
    () => output.value = perks
        .filter(perk => perk.selected)
        .map(perk => `# ${perk.name}\nplayer.addperk ${perk.code}\n`)
        .join(`\n`),
);
</script>

<template>
  <textarea>{{ output }}</textarea>
  <table class="table table-hover">
    <thead>
    <tr>
      <th>Name</th>
      <th>Code</th>
    </tr>
    </thead>
    <tbody>
    <tr class="tsr" :class="['bg-gradient', {'bg-success': perk.selected}]" v-for="perk in perks" @click="perk.selected = !perk.selected" :key="perk.code">
      <td class="ts w-50">{{ perk.name }}</td>
      <td class="ts w-50">{{ perk.code }}</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>
textarea {
  width: 100%;
  height: 200px;
  font-family: monospace;
}
</style>