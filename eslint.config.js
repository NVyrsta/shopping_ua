import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';

export default [
  {
    ignores: ['dist/**/*', 'vite.config.js']
  },

  { files: ['**/*.{js,mjs,cjs,vue}'] },
  { languageOptions: { globals: globals.browser } },

  pluginJs.configs.recommended,

  ...pluginVue.configs['flat/essential'],

  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': 'warn',
      'prefer-const': 'error',
      eqeqeq: ['error', 'always'],
      'vue/max-attributes-per-line': ['error', { singleline: 3, multiline: 1 }],
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/attribute-hyphenation': [
        'error',
        'always',
        {
          ignore: []
        }
      ]
    }
  }
];
