<template>
  <nav 
    aria-label="breadcrumb" 
    class="breadcrumbs flex justify-start items-center px-4 py-4 gap-4 overflow-x-auto"
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
              class="transform rotate-180"
            />
          </span>

          <router-link
            :to="category.link"
          >
            {{ $t(`Breadcrumbs.${category.translationKey}`) }}
          </router-link>
        </div>
      </li>
    </ol>

    <ol 
      v-if="product &&product.name[locale]"
      class="breadcrumb flex items-center justify-start gap-4"
    >
      <li class="breadcrumb-item flex items-center justify-start gap-4">
        <span class="arrow-next">
          <SvgIcon 
            id="back"
            width="6"
            height="10"
            fill="#6d6d6d"
            class="transform rotate-180"
          />
        </span>

        <span 
          class="text-gray-400 text-sm tracking-wide leading-4 whitespace-nowrap"
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
    default: () => [],
  },

  product: {
    type: Object,
    required: true,
    default: null,
  },
});

console.log('props.categories:', props.categories);

// const gender = props.product?.gender || ''; // Extract gender if available

const breadcrumbItems = computed(() => {
  // Create the base path for categories
  let categoryLinks = props.categories.map((category, index) => {
    const path = `/${props.categories.slice(0, index + 1).join('/')}`;
    return {
      link: path,
      translationKey: category,
    };
  });

  // Add gender to the beginning of the path if it exists
  // if (gender) {
  //   categoryLinks = [
  //     {
  //       link: `/${gender}`,
  //       translationKey: gender,
  //     },
  //     ...categoryLinks,
  //   ];
  // }

  console.log('categoryLinks:', categoryLinks);

  return categoryLinks;
});
</script>

<style scoped>
a {
  font-size: 14px;
  color: #a8a8a8;
  letter-spacing: .02em;
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
