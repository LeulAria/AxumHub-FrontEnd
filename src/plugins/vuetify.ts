import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#E0FBFC",
        secondary: "#32161F",
        accent: "#787878",
        error: "#FF5252",
        info: "#2196F3",
        success: "#92CB01",
        warning: "#F4FF52"
      },
      dark: {
        primary: "#202023",
        secondary: "#E0FBFC",
        accent: "#9a9a9a",
        error: "#FF5252",
        info: "#2196F3",
        success: "#A0DF01",
        warning: "#F4FF52"
      }
    }
  }
});
