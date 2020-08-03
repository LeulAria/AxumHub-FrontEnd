import Vue from "vue";

declare module "vue/types/vue" {
  interface Vue {
    $vs: any; // vuesax custom plugin
  }
}