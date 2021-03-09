import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from './zh'
import en from './en'
Vue.use(VueI18n)

// const local = localStorage.getItem('lang') || en

// 国际化
const i18n = new VueI18n({
  locale: 'zh', // set locale
  messages: {
    zh,
    en,
  },
})

export default i18n
