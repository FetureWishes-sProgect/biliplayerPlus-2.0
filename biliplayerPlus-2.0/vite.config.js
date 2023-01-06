import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';
import userscript from "./userscript";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.js',
      userscript: userscript,
    }),
  ],
  build:{
	fileName:userscript.version+".user.js"
  }
});