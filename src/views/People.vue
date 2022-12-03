<template>
  <div class="container">
    <div class="row">
      <div class="navbar mt-5">
        <div>
          <div v-if="$store.state.isAdmin">
            <transition name="fade" mode="out-in">
              <v-progress-circular v-if="isLoading" indeterminate color="primary"/>
              <div v-else>
                <v-btn color="primary" depressed @click="getPeopleType">
                  <div v-if="!isAllUsers">
                    Tüm kişileri getir
                  </div>
                  <div v-else>
                    Kendi kişilerimi getir
                  </div>
                </v-btn>
              </div>
            </transition>
          </div>
        </div>
        <div>
          <v-btn color="primary" depressed @click="addSomeone">
            <v-icon>mdi-account-multiple-plus</v-icon>
            Yeni kişi ekle
          </v-btn>
        </div>
      </div>
      <div class="col-sm-6">
        <v-card max-height="85vh" class="scroll">
          <v-card-title primary-title>
            <div>Esnaflar</div>
          </v-card-title>
          <v-card-subtitle> Esnaf sayısı: {{ esnaf.length }}</v-card-subtitle>
          <v-list-item two-line v-for="(item, index) in esnaf" :key="index">
            <v-list-item-content>
              <v-list-item-title>
                {{ item.Name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ item.Information }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-card-actions>
              <v-btn
                  depressed
                  small
                  color="primary"
                  icon
                  @click="selectSomeone(index, false)"
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
          <v-card-subtitle> ihvan sayısı: {{ ihvan.length }}</v-card-subtitle>
          <v-list-item two-line v-for="(item, index) in ihvan" :key="index">
            <v-list-item-content>
              <v-list-item-title>
                {{ item.Name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ item.Information }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                  depressed
                  small
                  color="primary"
                  icon
                  @click="selectSomeone(index, true)"
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
        :person="selectedPerson"
        :selectedPersonIndex="selectedPersonIndex"
        @closeDialog="closeDialog"
        @updatedPeople="updatedPeople"
        @deletedPeople="deletedPeople"
    />
    <AddSomeone
        :isDialogOpen="isAddSomeoneDialogOpen"
        @closeDialog="closeDialog"
        @addedPeople="addedPeople"
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
  mounted() {
    this.people = this.$store.state.userPeople;
  },
  data() {
    return {
      people: [],
      ihvan: [],
      esnaf: [],
      isInformationDialogOpen: false,
      isAddSomeoneDialogOpen: false,
      selectedPerson: {},
      selectedPersonIndex: 0,
      isLoading: false,
      isAllUsers: false
    };
  },
  watch: {
    people: {
      handler: function (people) {
        this.classifyingPeople(people);
      },
      deep: true,
      immediate: true,
    },
    "$store.state.userPeople": {
      handler: function (people) {
        this.classifyingPeople(people);
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    async getPeopleType() {
      this.isLoading = true
      this.isAllUsers ? await this.$func.getUserPeople() : await this.$func.getPeople()
      this.people = this.isAllUsers ? this.$store.state.userPeople : this.$store.state.people
      this.isAllUsers = !this.isAllUsers
      this.isLoading = false
    },
    selectSomeone(index, role) {
      this.isInformationDialogOpen = true;
      this.selectedPerson = role ? this.ihvan[index] : this.esnaf[index];
      this.selectedPersonIndex = index;
    },
    addSomeone() {
      this.isAddSomeoneDialogOpen = true;
    },
    closeDialog() {
      this.isAddSomeoneDialogOpen = false;
      this.isInformationDialogOpen = false;
    },
    classifyingPeople(people) {
      this.ihvan = people.filter((x) => x.Role);
      this.esnaf = people.filter((x) => !x.Role);
    },
    addedPeople(value) {
      this.people.unshift(value);
    },
    deletedPeople(index, isIhvan) {
      if (isIhvan) {
        this.ihvan.splice(index, 1);
      } else {
        this.esnaf.splice(index, 1);
      }
      this.people = this.ihvan.concat(this.esnaf);
    },
    updatedPeople(index, isIhvan, newValue) {
      if (isIhvan) {
        this.ihvan[index] = newValue;
      } else {
        this.esnaf[index] = newValue;
      }
      this.people = this.ihvan.concat(this.esnaf);
    },
  },
};
</script>