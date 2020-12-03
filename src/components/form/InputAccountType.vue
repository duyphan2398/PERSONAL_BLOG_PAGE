<template>
  <ValidationProvider tag="div"
                      :name="label"
                      :vid="vid"
                      v-slot="{ errors }">
    <label class="form-label"> {{ $t(label) }}</label>

    <div :class="{'has__error': errors[0]}">
      <a-radio-group
          name="radioGroup"
          :value="value"
          @change="handleChange">
        <a-radio :value="1">
          {{ $t('paid') }}
        </a-radio>
        <a-radio :value="0">
          {{ $t('free_of_charge') }}
        </a-radio>
      </a-radio-group>

      <!--Message Error-->
      <span v-if="errors[0]" class="errors">{{ errors[0] }}</span>
    </div>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'InputAccountType',

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    label: {
      type: String,
      required: true,
      default: ''
    },

    vid: {
      type: String,
      default: ''
    },

    value: {
      type: [String, Number],
      required: true,
      default: ''
    }
  },

  methods: {
    handleChange (evt) {
      this.$emit('change', evt.target.value)
    }
  }
}
</script>

<style scoped>

</style>
