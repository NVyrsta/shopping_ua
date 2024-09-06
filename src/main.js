import { createApp } from 'vue';
import { i18n } from '@/app/core/plugins/i18n.js';
import App from '@/App.vue';
import mitt from 'mitt';
import router from '@/router';

import SvgIcon from '@/components/SvgIcon.vue';

import '@/style.css';

const app = createApp(App); // Створення додатка

app.component('SvgIcon', SvgIcon);

const emitter = mitt();
app.config.globalProperties.emitter = emitter; // Додаємо emitter до глобальних властивостей

app
  .use(i18n)
  .use(router)
  .mount('#app'); // Використовуємо плагін i18n і монтуємо додаток
