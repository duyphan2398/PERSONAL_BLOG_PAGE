import Vue from 'vue'
import VueI18n from 'vue-i18n'
import validationMessagesEnglish from 'vee-validate/dist/locale/en'

// import languages
import english from '../../languages/en'
import { LOCALE } from '@/enum/locale.enum'

Vue.use(VueI18n)

const dictionary = {
  en: {
    format_tel: 'The {_field_} is wrong format',
    decimal: 'The {_field_} is wrong format',
    half_alphabet: 'The {_field_} is wrong format',
    youtube_valid: 'The {_field_} is wrong format',
    alpha_dot: '{_field_} is wrong format'
  }
}

const messages = {
  english: { ...english, validation: { ...validationMessagesEnglish.messages, ...dictionary.en } }
}

const i18n = new VueI18n({
  locale: LOCALE.en, // set locale
  messages,
  fallbackLocale: LOCALE.en
})

export default i18n
