import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver,AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import monkey, { cdn } from 'vite-plugin-monkey';
import userscript from "./userscript";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"^": path.resolve(__dirname, "."),
			"store": path.resolve(__dirname, "src/store"),
			"setting": path.resolve(__dirname, "src/setting"),
		},
	},
	plugins: [
		vue(),
		monkey({
			entry: 'src/main.js',
			userscript: userscript,
			build: {
				fileName: userscript.outputName + userscript.version + ".user.js",
				externalGlobals: {
					vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
				},
			},
		}),
		AutoImport({
			// 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
			resolvers: [
				ElementPlusResolver(),
				// 自动导入图标组件
				IconsResolver({
					prefix: 'Icon',
				}),
			],
		}),
		Components({
			resolvers: [
				// 自动注册图标组件
				IconsResolver({
					enabledCollections: ['ep'],
				}),
				// 自动导入 Element Plus 组件
				ElementPlusResolver(),
				AntDesignVueResolver (),
			],
		}),
		Icons({
			autoInstall: true,
		}),
	],
});