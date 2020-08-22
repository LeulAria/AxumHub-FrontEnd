import Vue from 'vue';
import VueI18n from 'vue-i18n'
import amharicLang from './localization/amharic/amharici18n'
import englishLang from './localization/english/englishi18n'
import arabicLang from './localization/arabic/arabici18n'

const messages = {
  am: amharicLang,
  en: englishLang,
  ar: arabicLang
}

Vue.use(VueI18n)

export default new VueI18n({
  locale: 'en',
  messages
})