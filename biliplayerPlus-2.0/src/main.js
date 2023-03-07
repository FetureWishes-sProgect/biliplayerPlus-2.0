import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createPinia } from 'pinia'
import drag from "v-drag"
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const pinia = createPinia();
let app=createApp(App);

app.use(drag,{
	// global configuration
  });
app.use(pinia);
app.use(VueSweetalert2);
app.mount(
  (() => {
    const app = document.createElement('div');
	app.style.display="contents";
    document.body.append(app);
    return app;
  })(),
);