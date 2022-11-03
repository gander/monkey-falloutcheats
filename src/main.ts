import {createApp} from 'vue';
import App from './App.vue';
import {ExtractedPerk} from './types';

const element = document.querySelector('.mobile-table');
if (element) {
    const perks: ExtractedPerk[] = Array.from(element.querySelectorAll('tr.tsr'))
        .map(row => Array.from(row.querySelectorAll('td')).map(cell => cell.innerText))
        .filter((row): row is [string, string] => row.length === 2 && row[0].length > 0 && row[1].length > 0)
        .map(([name, code]) => ({name, code}));

    createApp(App).provide('perks', perks).mount(element);
}
