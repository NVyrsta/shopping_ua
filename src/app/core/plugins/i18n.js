import { createI18n } from 'vue-i18n';
import uk from '@/lang/uk.json';
import en from '@/lang/en.json';

const messages = {
  uk,
  en,
};

export const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});

export default i18n;
