import Vue from 'vue';
import {
  extend,
  ValidationProvider,
  ValidationObserver,
  setInteractionMode,
} from 'vee-validate';
import { required, email, min, max } from 'vee-validate/dist/rules';

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
setInteractionMode('eager');

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
});
extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters',
});
extend('min', {
  ...min,
  message: '{_field_} may not be lesser than {length} characters',
});
extend('email', {
  ...email,
  message: 'Email must be valid',
});
