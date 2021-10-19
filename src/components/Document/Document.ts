import { computed, defineComponent } from 'vue'
import { IDocument } from '@/interfaces/IFiles'
import { fileRequest } from '@/api-client'
import { userStorage } from '@/storage'

export default defineComponent({
  name: 'DocumentComponent',
  props: {
    document: {
      type: Object as ()=> IDocument,
      required: true
    }
  },
  setup (props) {

    const profile = computed(() => userStorage.getters.getStateProfile())

    const onGetFile = async (isDownload: boolean) => {
      const { blob, success } = await fileRequest.downloadPhoto(profile.value.user_id!, props.document.document_id)
      if (success) {
        const payload = {
          blob,
          download: isDownload
        }
        let url = URL.createObjectURL(payload.blob);
        // Create an anchor element in the document
        const a = document.createElement('a');
        // Make anchor invisible
        a.style.display = 'none';
        // Add the anchor element to the body
        document.body.appendChild(a);
        // Set the HREF to a Blob representation of the data to be downloaded
        a.href = url;
        // Use download attribute to set desired file name
        if (payload.download) {
          a.setAttribute('download', props.document.name);
        } else {
          a.setAttribute('target', '_blank');
        }
        // Trigger the download by simulating click
        a.click();
        // Cleanup (to prevent memory leaks)
      }
    }

    return {
      onGetFile
    }
  }
})