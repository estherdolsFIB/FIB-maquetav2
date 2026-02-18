// HUB entry: Vue 3 + SCSS (sin jQuery)
import '../scss/app.scss';
import { createApp } from 'vue';
import App from './components/App.vue';

const app = createApp(App);
app.mount('#app-hub');
