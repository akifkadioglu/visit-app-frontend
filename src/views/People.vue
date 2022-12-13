<template>
  <div class="container">
    <div class="row">
      <div class="navbar mt-5">
        <div>
          <div v-if="$store.state.isAdmin">
            <transition name="fade" mode="out-in">
              <v-progress-circular
                v-if="isLoading"
                indeterminate
                color="primary"
              />

              <div v-else>
                <v-btn color="primary" depressed @click="getPeopleType">
                  <div v-if="!isAllUsers">Tüm kişileri getir</div>
                  <div v-else>Kendi kişilerimi getir</div>
                </v-btn>
              </div>
            </transition>
          </div>
        </div>
        <div>
          <v-progress-circular color="primary" indeterminate v-if="isLoading" />
          <v-btn @click="refresh" v-else depressed small color="primary" icon>
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </div>
        <div>
          <v-btn color="primary" depressed @click="addSomeone">
            <v-icon>mdi-account-multiple-plus</v-icon>
            Yeni kişi ekle
          </v-btn>
        </div>
      </div>
      <div class="col-sm-12">
        <v-text-field
          outlined
          placeholder="Kişilerde Ara.."
          v-model="search"
        ></v-text-field>
      </div>
      <div class="col-sm-6">
        <v-card max-height="85vh" class="scroll">
          <v-card-title primary-title>
            <div>Esnaflar</div>
          </v-card-title>
          <v-card-subtitle>
            Esnaf sayısı:
            {{ filteredPeople.filter((x) => !x.Role).length }}</v-card-subtitle
          >
          <v-list-item
            two-line
            v-for="(item, index) in filteredPeople.filter((x) => !x.Role)"
            :key="index"
          >
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
                @click="selectSomeone(item.ID)"
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
          <v-card-subtitle>
            ihvan sayısı:
            {{ filteredPeople.filter((x) => x.Role).length }}</v-card-subtitle
          >
          <v-list-item
            two-line
            v-for="(item, index) in filteredPeople.filter((x) => x.Role)"
            :key="index"
          >
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
                @click="selectSomeone(item.ID)"
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
  computed: {
    filteredPeople() {
      return this.isAllUsers
        ? this.$store.state.people.filter(
            (x) => x.Name.toLowerCase().indexOf(this.search) != -1
          )
        : this.$store.state.userPeople.filter(
            (x) => x.Name.toLowerCase().indexOf(this.search) != -1
          );
    },
  },
  data() {
    return {
      isInformationDialogOpen: false,
      isAddSomeoneDialogOpen: false,
      selectedPerson: {},
      selectedPersonIndex: 0,
      isLoading: false,
      isAllUsers: false,
      search: "",
    };
  },

  methods: {
    async getPeopleType() {
      this.isLoading = true;
      this.people = this.isAllUsers
        ? this.$store.state.userPeople
        : this.$store.state.people;
      this.isAllUsers = !this.isAllUsers;
      this.isLoading = false;
    },
    selectSomeone(id) {
      this.isInformationDialogOpen = true;
      this.selectedPerson = this.$store.state.people.filter(
        (x) => x.ID == id
      )[0];
    },
    addSomeone() {
      this.isAddSomeoneDialogOpen = true;
    },
    async closeDialog() {
      this.isAddSomeoneDialogOpen = false;
      this.isInformationDialogOpen = false;
      await this.refresh();
    },

    addedPeople(value) {
      this.$store.state.people.unshift(value);
      this.$store.state.userPeople.unshift(value);
    },
    deletedPeople(id) {
      this.$store.state.userPeople = this.$store.state.userPeople.filter(
        (x) => x.ID != id
      );
      this.$store.state.people = this.$store.state.userPeople.filter(
        (x) => x.ID != id
      );
    },
    updatedPeople(id, newValue) {
      this.$store.state.people.filter((x) => x.ID == id)[0] = newValue;
      this.$store.state.userPeople.filter((x) => x.ID == id)[0] = newValue;
    },
    async refresh() {
      this.isLoading = true;
      this.isAllUsers
        ? await this.$func.getPeople()
        : await this.$func.getUserPeople();
      this.isLoading = false;
    },
  },
};
</script>
