import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { redirectToLoginOrGetAccessToken } from './utils/kinde/guards';

const token = await redirectToLoginOrGetAccessToken();

createApp(App).mount('#app')
