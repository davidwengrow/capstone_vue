<template>
  <div class="receipts-index">

<h1>All Receipts</h1>
    <div>
      <button v-on:click="setSortAttribute('business_name')">Sort by Business Name</button>
    </div>
    Search by Business Name
    <input type="text" v-model="searchFilter" list="business_names" />
    <datalist id="business_names">
      <option v-for="receipt in receipts">{{ receipt.business_name }}</option>
    </datalist>
    <transition-group appear enter-active-class="animated rollIn" leave-active-class="animated bounceOutDown">
      <div
        v-for="receipt in orderBy(filterBy(receipts, searchFilter, 'business_name'), sortAttribute, sortAscending)"
        v-bind:key="receipt.id"
      >
        <h2>Business Name: {{ receipt.business_name }}</h2>
        <a v-bind:href="`/receipts/${receipt.id}`"
          ><img v-bind:src="receipt.image" v-bind:alt="receipt.business_name"
        /></a>
        <router-link v-bind:to="`/receipts/${receipt.id}`">More info</router-link>
      </div>
    </transition-group>
  </div>
</template>


<style>
img {
  width: 250px;
}
</style>

<script>
var axios = require("axios");
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      receipts: [],
      searchFilter: "",
      sortAttribute: "business_name",
      sortAscending: 1
    };
  },
  created: function() {
    axios
      .get("/api/receipts")
      .then(response => {
        this.receipts = response.data;
        console.log(this.receipts);
      })
      .catch(error => {
        console.log("Something went wrong...", error);
        if (error.response && error.response.status === 401) {
          this.$router.push("/login");
        }
      });
  },

  methods: {
    setSortAttribute: function(inputAttribute) {
      if (this.sortAttribute === inputAttribute) {
        if (this.sortAscending === 1) {
          this.sortAscending = -1;
        } else {
          this.sortAscending = 1;
        }
      } else {
        this.sortAscending = 1;
      }
      this.sortAttribute = inputAttribute;
    }
  }
};
</script>