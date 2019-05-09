<template>
  <div class="receipts-new">
    <h1>URECEIPTS APP</h1>
    <h2>Create A New Receipt!</h2>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
    <form v-on:submit.prevent="createReceipt()">
      <div>
        Image: <input type="file" v-on:change="setFile($event)" ref="fileInput" />
      </div>
      <img v-if="loading" src="/loading.gif" alt="">
      <p>{{ errorMessage }}</p>
      <br>
      <div class="pull-right">
        <ul v-for="line in lines">
          <li>{{ line }}</li>
        </ul>
      </div>
      <br>
      <div>Business:
        <input type="text" v-model="newReceiptBusinessName" />
      </div>
      <div>Address:
        <input type="text" v-model="newReceiptAddress" />
      </div>
      <div>Phone Number:
        <input type="text" v-model="newReceiptPhoneNumber" />
      </div>
      <div>Fax:
        <input type="text" v-model="newReceiptFax" />
      </div>
      <div>Email:
        <input type="text" v-model="newReceiptEmail" />
      </div>
      <div>Date:
        <input type="text" v-model="newReceiptDate" />
      </div>
      <div>Subtotal:
        <input type="text" v-model="newReceiptSubtotal" />
      </div>
      <div>Tax:
        <input type="text" v-model="newReceiptTax" />
      </div>
      <div>Total:
        <input type="text" v-model="newReceiptTotal" />
      </div>
      <div>You Save:
        <input type="text" v-model="newReceiptYouSave" />
      </div>
      
      

      <input type="hidden" v-model="newReceiptUserId" />
      <input type="submit" value="Create Receipt" />
    </form>
  </div>
</template>
<script>
var axios = require("axios");
export default {
  data: function() {
    return {
      loading: false,
      newReceiptBusinessName: "",
      newReceiptAddress: "",
      newReceiptPhoneNumber: "",
      newReceiptFax: "",
      newReceiptEmail: "",
      newReceiptDate: "",
      newReceiptSubtotal: "",
      newReceiptTax: "",
      newReceiptTotal: "",
      newReceiptYouSave: "",
      newReceiptImage: "",
      newReceiptUserId: "",
      lines: [],
      errors: [],
      errorMessage: ""
    };
  },
  // created: function() {},
  methods: {

    setFile: function(event) {
      if (event.target.files.length > 0) {
        this.loading = true;
        this.newReceiptImage = event.target.files[0];
        this.errorMessage = "";
        // Make a web request to some custom route to analyze the file...

        var formData = new FormData();
        formData.append("image", this.newReceiptImage);

        axios
          .post("/api/receipts_analyze", formData).then(response => {
            // The response will contain the results of the analysis
            // Change this.newReceiptBusinessName, etc. to some analysis result
            this.newReceiptImage = response.data.cloudinary_url;
            this.newReceiptBusinessName = response.data.fields.business_name;
            this.newReceiptAddress = response.data.fields.address;
            this.newReceiptPhoneNumber = response.data.fields.phone_number;
            this.newReceiptFax = response.data.fields.fax;
            this.newReceiptEmail = response.data.fields.email;
            this.lines = response.data.lines;
            this.newReceiptDate = response.data.fields.date;
            this.newReceiptSubtotal = response.data.fields.subtotal;
            this.newReceiptTax = response.data.fields.tax;
            this.newReceiptTotal = response.data.fields.total;
            this.newReceiptYouSave = response.data.fields.you_save;
            // this.newReceiptUserId
            console.log("receipts_analyze", response.data);
            this.loading = false;
          }).catch(error => {
            this.loading = false;
            this.errorMessage = "Analysis failed!";
          });
      }
    },
    createReceipt: function() {
      console.log("Create the receipt...");
      this.errors = [];
      var formData = new FormData();
      formData.append("image", this.newReceiptImage); 

      formData.append("business_name", this.newReceiptBusinessName);
      formData.append("address", this.newReceiptAddress);
      formData.append("phone_number", this.newReceiptPhoneNumber);
      formData.append("fax", this.newReceiptFax);
      formData.append("email", this.newReceiptEmail);
      formData.append("date", this.newReceiptDate);
      formData.append("subtotal", this.newReceiptSubtotal);
      formData.append("tax", this.newReceiptTax);
      formData.append("total", this.newReceiptTotal);
      formData.append("you_save", this.newReceiptYouSave);
      formData.append("user_id", this.newReceiptUserId);
      
      

      axios
        .post("/api/receipts", formData)
        .then(response => {
          this.$router.push("/receipts");
        })
        .catch(error => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
