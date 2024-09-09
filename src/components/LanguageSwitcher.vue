<template>
  <div class="language-switcher flex items-center justify-end">
    <button
      :class="{ active: selectedLanguage === 'en' }"
      @click="changeLanguage('en')"
    >
      EN
    </button>
    <button
      :class="{ active: selectedLanguage === 'uk' }"
      @click="changeLanguage('uk')"
    >
      UKR
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const selectedLanguage = ref(locale.value);

const changeLanguage = (lang) => {
  selectedLanguage.value = lang;
  locale.value = lang;
  localStorage.setItem('selectedLanguage', lang);
};

onMounted(() => {
  const savedLanguage = localStorage.getItem('selectedLanguage');
  
  if (savedLanguage) {
    selectedLanguage.value = savedLanguage;
    locale.value = savedLanguage;
  }
});
</script>

<style scoped>
.language-switcher button {
  padding: 5px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  color: #a4a4a4;
  cursor: pointer;
}

.language-switcher button.active {
  color: white;
}
</style>
