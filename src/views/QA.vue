<template>
  <v-main>
    <h4>AxumHub QA</h4>
    <v-row no-gutters class="my-2 mb-4">
      <v-col cols="12">
        <v-text-field
          v-model="search"
          cache-items
          prepend-inner-icon="mdi-magnify"
          class="auto-complete mx-4 mx-md-13"
          flat
          hide-no-data
          hide-details
          label="Search Events..."
          solo-inverted
        ></v-text-field>
      </v-col>
    </v-row>
    </v-main>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component({})
export default class QA extends Vue {
  search = '';
}
</script>