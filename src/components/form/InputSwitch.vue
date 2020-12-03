<template>
  <div class="switch-active"  v-bind:class="verticalClassComponent">
    <label class="form-label" v-bind:class="marginClassLabel">{{ $t(label) }}</label>

    <a-switch v-model="switchValue"/>
  </div>
</template>

<script>
export default {
  name: 'InputSwitch',

  props: {
    label: {
      type: String,
      required: true,
      default: ''
    },

    value: {
      type: Boolean,
      required: true,
      default: false
    },

    vertical: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    switchValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },

    verticalClassComponent () {
      return {
        'd-flex': this.vertical,
        'flex-row-reverse': this.vertical,
        'justify-content-end': this.vertical,
        'align-items-center': this.vertical
      }
    },

    marginClassLabel () {
      return {
        'ml-2': this.vertical,
        'mb-0': this.vertical
      }
    }

  }
}
</script>

<style scoped>

</style>
