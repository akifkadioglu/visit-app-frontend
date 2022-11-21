<template>
  <div class="container">
    <div class="row">
      <div class="text-end mt-5">
        <v-btn color="primary" depressed @click="addSomeone">
          <v-icon>mdi-account-multiple-plus</v-icon>
          Yeni kişi ekle
        </v-btn>
      </div>
      <div class="col-sm-6">
        <v-card max-height="85vh" class="scroll">
          <v-card-title primary-title>
            <div>Esnaflar</div>
          </v-card-title>
          <v-card-subtitle> Esnaf sayısı: 51</v-card-subtitle>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Esnaf adı</v-list-item-title>
              <v-list-item-subtitle>Hakkında bilgi</v-list-item-subtitle>
            </v-list-item-content>
            <v-card-actions>
              <v-btn
                depressed
                small
                color="primary"
                icon
                @click="selectSomeone"
              >
                <v-icon>mdi-information-outline</v-icon>
              </v-btn>
            </v-card-actions>
          </v-list-item>
        </v-card>
      </div>
      <div class="col-sm-6">
        <v-card max-height="85vh" class="scroll">
          <v-card-title primary-title>
            <div>İhvanlar</div>
          </v-card-title>
          <v-card-subtitle> ihvan sayısı: 91 </v-card-subtitle>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Ihvan adı</v-list-item-title>
              <v-list-item-subtitle>Hakkında bilgi</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                depressed
                small
                color="primary"
                icon
                @click="selectSomeone"
              >
                <v-icon>mdi-information-outline</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-card>
      </div>
    </div>
    <Information
      :isDialogOpen="isInformationDialogOpen"
      @closeDialog="closeDialog"
    />
    <AddSomeone
      :isDialogOpen="isAddSomeoneDialogOpen"
      @closeDialog="closeDialog"
    />
  </div>
</template>

<script>
import AddSomeone from "../components/People/AddSomeone.vue";
import Information from "../components/People/Information.vue";
export default {
  components: {
    Information,
    AddSomeone,
  },
  data() {
    return {
      isInformationDialogOpen: false,
      isAddSomeoneDialogOpen: false,
    };
  },
  methods: {
    selectSomeone() {
      this.isInformationDialogOpen = true;
    },
    addSomeone() {
      this.isAddSomeoneDialogOpen = true;
    },
    closeDialog() {
      this.isAddSomeoneDialogOpen = false;
      this.isInformationDialogOpen = false;
    },
  },
};
</script>

<style></style>
