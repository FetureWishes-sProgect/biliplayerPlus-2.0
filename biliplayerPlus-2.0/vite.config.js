import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import monkey, { cdn } from 'vite-plugin-monkey';
import userscript from "./userscript";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    monkey({
      entry: 'src/main.js',
      userscript: userscript,
      build: {
		fileName:userscript.version+".user.js",
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
        },
      },
    }),
	AutoImport({
		resolvers: [ElementPlusResolver()],
	  }),
	  Components({
		resolvers: [ElementPlusResolver()],
	  }),
  ],
});