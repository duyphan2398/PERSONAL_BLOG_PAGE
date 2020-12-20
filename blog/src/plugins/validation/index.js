import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend, configure } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import i18n from '../i18n'

// with typescript
for (let [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    ...validation
  })
}

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

configure({
  defaultMessage: (field, values) => {
    const text = field.toLowerCase()
    // override the field name.
    values._field_ = i18n.t(`${text}`)
    return i18n.t(`validation.${values._rule_}`, values)
  }
})
