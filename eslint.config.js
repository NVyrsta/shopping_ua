import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';

export default [
  { files: ['**/*.{js,mjs,cjs,vue}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    rules: {
      // JavaScript rules
      eqeqeq: ['error', 'always'], // Enforce the use of === and !==
      'no-debugger': 'warn', // Warn on debugger statements
      semi: ['error', 'always'], // Enforce semicolons
      quotes: ['error', 'single'], // Enforce single quotes
      indent: ['error', 2], // Enforce 2-space indentation
      'no-unused-vars': ['warn'], // Warn on unused variables
      'no-undef': ['error'], // Disallow the use of undeclared variables
      camelcase: ['error', { properties: 'always' }], // Enforce camelCase naming convention

      // Vue.js rules
      'vue/html-indent': ['error', 2], // Enforce 2-space indentation in HTML
      'vue/multiline-html-element-content-newline': ['warn', { allowEmptyLines: false }], // Enforce new line for multi-line HTML elements
      'vue/attributes-order': [
        'error',
        {
          order: [
            'DEFINITION',
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'GLOBAL',
            'UNIQUE',
            'TWO_WAY_BINDING',
            'OTHER_DIRECTIVES',
            'CONTENT',
            'OTHER_ATTR',
          ],
        },
      ], // Enforce attribute order in Vue.js templates
      'vue/valid-v-slot': ['error'], // Enforce valid `v-slot` directives
      'vue/no-v-html': ['warn'], // Warn on usage of `v-html`
    },
  },
];
