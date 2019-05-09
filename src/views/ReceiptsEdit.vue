<template>
  <div class="receipts-edit">
    <h1>URECEIPTS APP</h1>

    <div>
      <h4>Edit Receipt</h4>
      Business:
      <input type="text" v-model="receipt.business_name" />
      Address:
      <input type="text" v-model="receipt.address" />
      Phone Number:
      <input type="text" v-model="receipt.phone_number" />
      Fax:
      <input type="text" v-model="receipt.fax" />
      Email:
      <input type="text" v-model="receipt.email" />
      Date:
      <input type="text" v-model="receipt.date" />
      Subtotal:
      <input type="text" v-model="receipt.subtotal" />
      Tax:
      <input type="text" v-model="receipt.tax" />
      Total:
      <input type="text" v-model="receipt.total" />
      You Save:
      <input type="text" v-model="receipt.you_save" />
      Image:
      <input type="text" v-model="receipt.image" />
      User ID:
      <input type="text" v-model="receipt.user_id" />
      <button v-on:click="updateReceipt(receipt)">Update Receipt</button>
      <router-link to="/">Cancel</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      receipt: {}
    };
  },
  created: function() {
    axios.get("/api/receipts/" + this.$router.params.id).then(response => {
      this.receipt = response.data;
    });
  },
  methods: {
    updateReceipt: function(receipt) {
      var params = {
        business_name: receipt.business_name,
        address: receipt.address,
        phone_number: receipt.phone_number,
        fax: receipt.fax,
        email: receipt.email,
        date: receipt.date,
        subtotal: receipt.subtotal,
        tax: receipt.tax,
        total: receipt.total,
        you_save: receipt.you_save,
        image: receipt.image,
        user_id: receipt.user_id
      };
      axios.patch("/api/receipts/" + receipt.id, params).then(response => {
        console.log("Successfully Updated", response.data);
        receipt = response.data;
        this.$router.push("/");
      });
    }
  }
};
</script>
