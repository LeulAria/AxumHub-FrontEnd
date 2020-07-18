<template>
  <v-main>
    <v-container>
      <div class="info pa-5 rounded-lg elevation-1">
        <h1 class="text-center text--primary">Axum HUB</h1>
        <p class="text-center text--white">Chat spaces! 🔥</p>
      </div>
      <v-devider></v-devider>
      <br />
      <v-row justify="center">
        <v-col cols="6">
          <v-alert
            v-show="$socket.connected"
            v-model="connectionAlert"
            type="success"
            elevation="3"
            dismissible
          >Connected</v-alert>
          <v-alert
            v-show="!$socket.connected"
            v-model="connectionAlert"
            type="error"
            elevation="3"
            dismissible
          >Ooops Not Connected</v-alert>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Socket } from "vue-socket.io-extended";

@Component({})
export default class ChatSpace extends Vue {
  connectionAlert = true;

  @Socket()
  connect() {
    console.log("connection established...");
  }
}
</script>