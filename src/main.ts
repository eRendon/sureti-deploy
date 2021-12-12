import app from "./plugins/app";
/*
ToDo TailWind CSS
*/
import './assets/css/index.css'

/*
ToDo Plugins
*/

import './plugins'
import { authStorage } from './storage'

app.mount('#app')
const auth = authStorage.getters.getStateAuth()

/*
ToDo Init information user (profile, isLoggedIn, stateBrowser and userType)
*/

authStorage.actions.init()