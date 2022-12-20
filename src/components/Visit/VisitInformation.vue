<template>
  <div>
    <v-layout row justify-center>
      <v-dialog v-model="isDialogOpen" persistent width="600">
        <v-card>
          <v-btn
            class="m-2"
            @click="$emit('closeDialog')"
            color="error"
            depressed
            icon
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-list>
            <v-list-item v-for="(item, index) in visits" :key="index">
              <v-list-item-content>
                <v-list-item-title class="m-2">{{
                  item.People.Name
                }}</v-list-item-title>
                <v-list-item-subtitle class="text-wrap ml-2">
                  {{ item.Description }}
                </v-list-item-subtitle>
                <v-divider></v-divider>
              </v-list-item-content>
              <v-list-item-action>
                {{ item.VisitedAt | moment("Do MMMM YYYY, dddd H:mm") }}
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: {
    isDialogOpen: {
      type: Boolean,
      default: false,
    },
    visits: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style></style>
