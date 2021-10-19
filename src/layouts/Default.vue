<template>
  <s-header></s-header>
  <div>
    <main role="main" id="sureti-content">
      <router-view></router-view>
    </main>
    <loading-overlay></loading-overlay>
    <alert></alert>
    <payments-modal></payments-modal>
  </div>
</template>

<script lang="ts">
import Header from '../components/Layouts/Header/Header.vue'

import { computed, defineComponent, onMounted } from 'vue'
import { authStorage, userStorage, userTypeStore } from '../storage'

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    'SHeader': Header
  },
  setup () {

    const profile = computed(() => userStorage.getters.getStateProfile())

    const auth = computed(() => authStorage.getters.getStateAuth())

    onMounted(async () => {
      await authStorage.actions.init()
      if (profile.value.user_type === 'home') {
        await userTypeStore.actions.loadFlowClient()
      } else if (profile.value.user_type === 'investment') {
        userTypeStore.actions.loadFlowInvestment()
      }
    })

    return {
      auth
    }
  }
})
</script>

<style scoped>
#sureti-content {
  padding:20px;
  max-width: 1160px;
  margin:0 auto;
}
@media all and (min-width:768px){
  #sureti-content {
  padding:35px 25px;
  max-width: 1160px;
  margin:0 auto;
}
}
</style>
