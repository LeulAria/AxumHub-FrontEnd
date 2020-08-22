<template>
  <v-container class="bg-img">
    <v-row justify="center">
      <v-col cols="10" sm="6" md="5" class="auth-form-container">
        <h1 class="form-header text-center mt-8">Login</h1>
        <v-card elevation="0" dark class="pa-6 form-container">
          <ValidationObserver ref="loginObserver">
            <form>
              <ValidationProvider v-slot="{ errors }" name="E-mail" rules="required|min:2">
                <v-text-field
                  v-model="email"
                  :error-messages="errors"
                  prepend-icon="mdi-email-outline"
                  hint="Email account or Username"
                  label="Username / E-mail"
                  required
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider v-slot="{ errors }" name="E-mail" rules="required|min:8">
                <v-text-field
                  v-model="password"
                  :prepend-icon="loginpassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                  :type="loginpassword ? 'text' : 'password'"
                  :error-messages="errors"
                  name="password1"
                  label="Password"
                  hint="At least 8 characters"
                  @click:prepend="loginpassword = !loginpassword"
                  required
                ></v-text-field>
              </ValidationProvider>
              <v-card-actions>
                <v-btn to="/signup" small text color="info">Dont have Account?</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  :loading="loadingLogin"
                  :disabled="loadingLogin"
                  color="indigo"
                  class="ma-2 white--text"
                  small
                  @click="submit"
                >
                  <span v-show="!loadingLogin">Submit</span>
                  <v-icon class="px-4" dark v-show="loadingLogin">mdi-cloud-upload</v-icon>
                </v-btn>
              </v-card-actions>
            </form>
          </ValidationObserver>

          <div class="d-flex justify-center mt-5 mb-2">or</div>
          <vs-button
            href="https://ethiopia-identity-provider.herokuapp.com/o/authorize/?scope=user&response_type=code&client_id=v6Sy2qkT2IoNsKHb8lyHMpGo9ZKML5HsE5ISS81x"
          >Login With ETP</vs-button>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";

// form validation
import { extend, setInteractionMode } from "vee-validate";
import { required, email, min, max } from "vee-validate/dist/rules";

setInteractionMode("eager");

@Component({
  computed: {
    ...mapGetters("profile", ["userProfile"])
  },
  methods: {
    ...mapActions(["loginUser"])
  }
})
export default class Login extends Vue {
  userProfile!: any;
  email = "";
  password = "";
  loginpassword = false;
  loadingLogin = false;

  created() {
    this.$store.dispatch("navbar", false);
  }

  submit() {
    this.loadingLogin = true;
    (this.$refs.loginObserver as Vue & {
      validate: () => any;
    })
      .validate()
      .then((isValid: boolean) => {
        if (isValid) {
          const info: any = {
            password: this.password
          };
          if (/[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,3}/.test(this.email))
            info.email = this.email;
          else info.name = this.email;

          this.$store
            .dispatch("users/loginUser", info)
            .then(res => {
              this.loadingLogin = false;
              console.log(
                "the pofile obj: ",
                Object.keys(this.userProfile).length
              );
              if (Object.keys(this.userProfile).length)
                this.$router.push({ name: "ProfileInfo" });

              this.$store.dispatch("navbar", true);
              this.$router.push({ name: "Dashboard" });

              this.$vs.notification({
                icon: "<i class='bx bx-bell' ></i>",
                color: "primary",
                position: "top-right",
                title: "Welcome",
                text: `Success: Welcome again ${this.userProfile.name} to axumhb`
              });
            })
            .catch((err: string) => {
              setTimeout(() => (this.loadingLogin = false), 2000);
              this.$vs.notification({
                icon: "<i class='bx bxs-bug' ></i>",
                color: "danger",
                position: "top-right",
                title: "Login Error",
                text: `Error: ${err}`
              });
            });
        } else {
          setTimeout(() => (this.loadingLogin = false), 2000);
        }
      })
      .catch((error: any) => {
        setTimeout(() => (this.loadingLogin = false), 2000);
      });
  }

  loginWithIdentityProvider() {
    console.log("so mame u their 😇");
    console.log("k lets do this thing 👨‍⚕️");
    // this.$store.dispatch("navbar", true);
    // this.$router.push({ name: "Dashboard" });

    this.$store
      .dispatch("users/loginWithIdentityProvider")
      .then(res => {
        this.$vs.notification({
          icon: "<i class='bx bx-bell' ></i>",
          color: "primary",
          position: "top-right",
          title: "Welcome",
          text: `Success: Welcome again to axumhb`
        });
      })
      .catch((err: string) => {
        this.$vs.notification({
          icon: "<i class='bx bxs-bug' ></i>",
          color: "danger",
          position: "top-right",
          title: "Login Error",
          text: `Error: ${err}`
        });
      });
  }
}
</script>

<style lang="stylus" scoped>
.bg-img {
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  top: 0;
  left: 0;
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.86), rgba(0, 0, 20, 0.96)), url('https://www.omenkaonline.com/wp-content/uploads/2017/08/ETH_2015_DK_154_0.jpg');
  background-position: center;
  background-attachment: cover;
}

.auth-form-container {
  position: relative;
  max-width: 360px !important;
  min-height: 390px !important;
  background: rgba(0, 0, 5, 0.7);
  box-shadow: 0 0 15px rgba(0, 0, 20, 0.8);
  overflow: hidden;

  &::after {
    content: '';
    z-index: 1;
    position: absolute;
    top: -60%;
    left: 10px;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 5, 0.97);
    transform: rotate(0deg);
    border-top-left-radius: 450px;
    border-top-right-radius: 560px;
    border-bottom-left-radius: 700px;
    border-bottom-right-radius: 400px;
    animation: rfa 10s linear alternate infinite;

    @keyframes rfa {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(560deg);
      }
    }
  }
}

.form-header {
  padding: 5px 0;
  color: #fff;
  position: relative;
  z-index: 3 !important;
}

.form-container {
  background: #fff0;
  z-index: 2;
}
</style>