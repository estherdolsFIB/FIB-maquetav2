// HUB entry: Vue 3 + SCSS (sin jQuery)
import '../scss/app.scss';
import { createApp, h } from 'vue';
import HubLayout from './components/HubLayout.vue';
import App from './components/App.vue';

const app = createApp({
  render() {
    return h(HubLayout, null, { default: () => h(App) });
  },
});
app.mount('#app-hub');
