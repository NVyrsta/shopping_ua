<template>
  <nav
    aria-label="breadcrumb"
    class="breadcrumbs flex items-center justify-start gap-4 px-4 py-4"
  >
    <ol class="breadcrumb flex items-center justify-start gap-4">
      <router-link to="/">{{ $t('Breadcrumbs.Main') }}</router-link>

      <span class="arrow-next">
        <SvgIcon
          id="back"
          width="6"
          height="10"
          fill="#6d6d6d"
          class="rotate-180 transform"
        />
      </span>
    </ol>

    <ol class="breadcrumb">
      <li
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="breadcrumb.path"
        class="breadcrumb-item"
        :class="{ active: index === breadcrumbs.length - 1 }"
      >
        <div v-if="index !== breadcrumbs.length - 1">
          <router-link :to="breadcrumb.path">
            {{ $t(`Breadcrumbs.${breadcrumb.name}`) }}
          </router-link>

          <span class="arrow-next">
            <SvgIcon
              id="back"
              width="6"
              height="10"
              fill="#6d6d6d"
              class="rotate-180 transform"
            />
          </span>
        </div>

        <span
          v-else
          class="whitespace-nowrap text-sm leading-4 tracking-wide text-gray-400"
        >
          {{ $t(`Breadcrumbs.${breadcrumb.name}`) }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  const breadcrumbs = computed(() => {
    const paths = route.path.split('/').filter(Boolean);

    return paths.map((path, index) => {
      const fullPath = '/' + paths.slice(0, index + 1).join('/');

      return {
        name: path.charAt(0).toUpperCase() + path.slice(1),
        path: fullPath
      };
    });
  });
</script>

<style scoped>
  a {
    font-size: 14px;
    color: #a8a8a8;
    font-size: 14px;
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
