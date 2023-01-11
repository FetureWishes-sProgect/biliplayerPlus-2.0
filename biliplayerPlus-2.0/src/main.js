import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createPinia } from 'pinia'


const pinia = createPinia();
let app=createApp(App);
app.use(pinia);
app.mount(
  (() => {
    const app = document.createElement('div');
	app.style.display="contents";
    document.body.append(app);
    return app;
  })(),
);