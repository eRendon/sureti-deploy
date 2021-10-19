import { computed, defineComponent } from 'vue';
import { loaderStore } from '../../../storage'


export default defineComponent({
    name: 'OverlayLoader',
    setup() {

        const storageLoading = computed( () => loaderStore.getters.getOverlayModal());

        return {
            storageLoading,
        }
    }
})