import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueGeolocation from 'vue-browser-geolocation'
import * as VueGoogleMaps from 'vue2-google-maps'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faBars, faBookOpen, faHome, faPen, faRightFromBracket, faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'

/* add icons to the library */
library.add(faUserSecret)
library.add(faHome)
library.add(faRightFromBracket)
library.add(faPen)
library.add(faBookOpen)
library.add(faFacebook)
library.add(faTwitter)
library.add(faInstagram)
library.add(faLinkedin)
library.add(faBars)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

// geoLocation
Vue.use(VueGeolocation)

Vue.config.productionTip = false

// google maps
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDY7G21YaXSz_jI1EAOqnNxnQC8--3Wlpw'
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
