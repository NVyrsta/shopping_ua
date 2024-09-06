import { createApp } from 'vue';
import { i18n } from '@/app/core/plugins/i18n.js';
import { svgSpritePlugin } from 'vue-svg-sprite';
import App from '@/App.vue';
import mitt from 'mitt';
import router from '@/router';

import '@/style.css';

const app = createApp(App); // Створення додатка

const emitter = mitt();
app.config.globalProperties.emitter = emitter; // Додаємо emitter до глобальних властивостей

app
  .use(i18n)
  .use(router)
  .use(svgSpritePlugin, {
    url: '/assets/svg/sprite.svg',
    class: 'svg-icon',
  })
  .mount('#app'); // Використовуємо плагін i18n і монтуємо додаток
