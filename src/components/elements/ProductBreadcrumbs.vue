<template>
  <nav
    aria-label="breadcrumb"
    class="breadcrumbs flex items-center justify-start gap-4 overflow-x-auto px-4 py-4"
  >
    <ol class="breadcrumb flex items-center justify-start gap-4">
      <router-link to="/">{{ $t('Breadcrumbs.Main') }}</router-link>
    </ol>

    <ol class="breadcrumb flex items-center justify-start gap-4">
      <li
        v-for="(category, index) in breadcrumbItems"
        :key="index"
        class="breadcrumb-item"
        :class="{ active: index === breadcrumbItems.length - 1 }"
      >
        <div class="flex items-center justify-start gap-4">
          <span class="arrow-next">
            <SvgIcon
              id="back"
              width="6"
              height="10"
              fill="#6d6d6d"
              class="rotate-180 transform"
            />
          </span>

          <router-link :to="category.link">
            {{ $t(`Breadcrumbs.${category.translationKey}`) }}
          </router-link>
        </div>
      </li>
    </ol>

    <ol
      v-if="product && product.name[locale]"
      class="breadcrumb flex items-center justify-start gap-4"
    >
      <li class="breadcrumb-item flex items-center justify-start gap-4">
        <span class="arrow-next">
          <SvgIcon
            id="back"
            width="6"
            height="10"
            fill="#6d6d6d"
            class="rotate-180 transform"
          />
        </span>

        <span
          class="whitespace-nowrap text-sm leading-4 tracking-wide text-gray-400"
        >
          {{ product.name[locale] }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';

  const { locale } = useI18n();

  const props = defineProps({
    categories: {
      type: Array,
      required: true,
      default: () => []
    },

    product: {
      type: Object,
      required: true,
      default: null
    }
  });

  const breadcrumbItems = computed(() => {
    const categoryLinks = props.categories.map((category, index) => {
      const path = `/${props.categories.slice(0, index + 1).join('/')}`;
      return {
        link: path,
        translationKey: category
      };
    });

    return categoryLinks;
  });
</script>

<style scoped>
  a {
    font-size: 14px;
    color: #a8a8a8;
    letter-spacing: 0.02em;
    line-height: 16px;
    text-decoration: none;
    white-space: nowrap;
    transition: 0.3s ease-in-out;
    cursor: pointer;
  }

  a:hover {
    text-decoration: underline;
  }

  span {
    color: #a8a8a8;
  }
</style>
