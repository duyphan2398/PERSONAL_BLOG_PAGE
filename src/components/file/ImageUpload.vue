<template>
  <div id="image-upload">
    <button type="button"
            class="btn btn-primary w-100"
            @click="$refs.inputFile.click()">
      <a-icon type="cloud-upload" class="mr-1" :style="{ fontSize: '16px' }"/>
      {{ $t('choose_file') }}
    </button>
    <input type="file"
           ref="inputFile"
           @change="onFileChange($event)"
           @click="$refs.inputFile.value = []"
           :multiple="multiple"
           :accept="accept"
           hidden>
  </div>
</template>

<script>
import uniqueId from 'lodash-es/uniqueId'

export default {
  name: 'ImageUpload',

  props: {
    multiple: false,
    accept: {
      type: String,
      default: 'image/png,image/jpg,image/jpeg'
    }
  },

  data () {
    return {
      fileUploads: []
    }
  },

  methods: {
    async onFileChange (evt) {
      let files = evt.target.files || evt.dataTransfer.files

      if (!files.length) return

      const fileUploads = []
      for (let file of files) {
        file = Object.assign(file, {
          uid: uniqueId('imageUpload_'),
          src: await this.toBase64(file)
        })
        fileUploads.push(file)
      }
      this.fileUploads = [...fileUploads]
      // emit event
      this.uploadComplete(this.fileUploads)
    },

    async toBase64 (file) {
      const reader = new FileReader()

      return new Promise((resolve, reject) => {
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    },

    uploadComplete (images) {
      this.$emit('onUploadImage', images[0])
    }
  }
}
</script>

<style scoped lang="postcss">

</style>
