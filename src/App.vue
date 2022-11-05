<script setup lang="ts">
import {inject, reactive, ref, watch} from 'vue';
import {ExtractedPerk, Perk} from './types';

function split(value: string): { group: string, level: number } | null {
  const result = /^(?<group>.+)\s(?<level>\d+)$/.exec(value)?.groups;
  return result ? {
    group: result.group,
    level: parseInt(result.level),
  } : null;
}

const extractedPerks = inject<ExtractedPerk[]>('perks', []);
const groupedPerks = reactive<Map<string, Perk[]>>(new Map);
const allPerks = reactive<Perk[]>([]);
const output = ref('');

extractedPerks.forEach(ePerk => {
  const result = split(ePerk.name);
  if (result) {
    const {group, level} = result;
    const perk = reactive<Perk>({...ePerk, group, level, selected: false});
    allPerks.push(perk);

    if (!groupedPerks.has(group)) {
      groupedPerks.set(group, []);
    }

    groupedPerks.get(group)?.push(perk);
  }
});


watch(
    allPerks,
    () => output.value = allPerks
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
      <th>Level</th>
      <th>Code</th>
    </tr>
    </thead>
    <tbody>
    <template v-for="[group,perks] in groupedPerks">
      <tr>
        <th colspan="2">{{ group }}</th>
      </tr>
      <tr class="tsr" :class="['bg-gradient', {'bg-success': perk.selected}]" v-for="perk in perks" @click="perk.selected = !perk.selected" :key="perk.code">
        <td class="ts w-50">{{ perk.level }}</td>
        <td class="ts w-50">{{ perk.code }}</td>
      </tr>
    </template>
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