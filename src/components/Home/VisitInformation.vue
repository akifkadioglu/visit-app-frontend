<template>
  <div>
    <v-layout row justify-center>
      <v-dialog v-model="isDialogOpen" persistent width="600">
        <v-card>
          <v-card-title v-if="selectedVisit.People" primary-title>
            {{ selectedVisit.People.Name }}
          </v-card-title>
          <v-card-text v-if="selectedVisit.Personnels">
            <v-list-item v-if="selectedVisit.Personnels.length > 0">
              <v-list-item-content>
                <v-list-item-title>
                  Seninle birlikte ziyaret edenler
                </v-list-item-title>
                <v-list-item-subtitle class="text-wrap">
                  <v-chip
                    class="ma-2"
                    v-for="(item, index) in selectedVisit.Personnels"
                    :key="index"
                  >
                    {{ item.Name }}
                  </v-chip>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card-text>
          <v-card-text>
            <v-list-item v-if="selectedVisit.Description">
              <v-list-item-content>
                <v-list-item-title>Ziyaret açıklaması</v-list-item-title>
                <v-list-item-subtitle class="text-wrap">
                  {{ selectedVisit.Description }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card-text>
          <v-card-text>
            {{ selectedVisit.VisitedAt | moment("Do MMMM YYYY, dddd H:mm") }}
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="secondary" depressed @click="$emit('closeSheet')">
              Kapat
            </v-btn>
            <v-progress-circular
              v-if="isLoading"
              indeterminate
              color="primary"
            />
            <v-btn
              v-else
              color="error"
              depressed
              @click="$emit('deleteVisit', selectedVisit, index)"
            >
              Sil
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    isDialogOpen: {
      type: Boolean,
      default: false,
    },
    selectedVisit: {
      type: Object,
      default() {
        return {};
      },
    },
    index: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style></style>
