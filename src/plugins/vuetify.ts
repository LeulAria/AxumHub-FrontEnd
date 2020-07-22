import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify, {
  iconfont: 'md'
});

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#45B",
        secondary: "#F0F0F0",
        accent: "#555",
        error: "#FF5252",
        info: "#2196F3",
        success: "#92CB01",
        warning: "#F4FF52"
      },
      dark: {
        primary: "#78B",
        secondary: "#202023",
        accent: "#9a9a9a",
        error: "#FF5252",
        info: "#2196F3",
        success: "#A0DF01",
        warning: "#F4FF52"
      }
    }
  }
});
