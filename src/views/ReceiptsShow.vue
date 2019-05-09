<template>
  <div class="receipts-show">
    <h2>Business Name: {{ receipt.business_name }}</h2>
    <img v-bind:src="receipt.image" v-bind:alt="receipt.business_name" />

    <p>Address: {{ receipt.address }}</p>
    <p>Phone Number: {{ receipt.phone_number }}</p>
    <p>Email: {{ receipt.email }}</p>
    <div class="invoice-box" id="invoice-box">
  <table cellpadding="0" cellspacing="0">
    <tr class="top">
      <td colspan="4">
        <table>
          <tr>
            <td class="title">
              <img src="./Ureceipts.png" style="width:100%; max-width:300px;">
            </td>

            <td>
              <br> Created: {{ receipt.date }}<br> 
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr class="information">
      <td colspan="4">
        <table>
          <tr>
            <td>
              Ureceipts, Inc.<br> 12345 Actualize<br> Chicago
            </td>

            <td>
              <br>
              {{ receipt.business_name }}<br>

               <br> {{ receipt.phone_number }}<br>
              <br> {{ receipt.address }}<br>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    

    <tr class="heading">
      <td>Subtotal</td>
      <td>Tax</td>
      <td>Total</td>
      <td>You Save</td>
    </tr>

    <tr class="receipt">
      <td>$<input type="number" v-model="receipt.subtotal" /></td>
      <td>$<input type="number" v-model="receipt.tax" /></td>
      <td>$<input type="number" v-model="receipt.total" /></td>
      <!-- <td>${{ receipt.price * receipt.quantity | currency }}</td> -->
      <td>$<input type="number" v-model="receipt.you_save" /></td>
    </tr>

    <!-- <tr>
      <td colspan="4">
        <button class="btn-add-row" @click="addRow">Add row</button>
      </td>
    </tr> -->

    <tr class="total">
      <td colspan="3"></td>
      <td>Total: ${{ receipt.total | currency }}</td>

    </tr>

  </table>
  <button class="button" onclick="printJS('invoice-box', 'html')">
    Print Form
 </button>
  <button class="button"><download-excel
    class   = "btn btn-default"
    :data   = "json_data"
    :fields = "json_fields"
    worksheet = "My Worksheet"
    type    = "csv"
    name    = "filename.xls"
  >
    Download Data To Excel
  </download-excel></button>


</div>

    <button class="button" v-on:click="destroyReceipt(receipt)">Destroy receipt</button>

    <router-link v-bind:to="`/receipts/${receipt.id}/edit`"><button class="button">Edit this receipt</button></router-link>

    <router-link to="/receipts"><button class="button">Back to all receipts</button></router-link>
  </div>
</template>
<style> 
.invoice-box {
  max-width: 800px;
  margin: auto;
  padding: 30px;
  border: 1px solid #eee;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 24px;
  font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
  color: #555;
  position: absolute;
  right:200px;
  top:150px;
}

.invoice-box table {
  width: 100%;
  line-height: inherit;
  text-align: left;
}

.invoice-box table td {
  padding: 5px;
  vertical-align: top;
}

.invoice-box table tr td:nth-child(n + 2) {
  text-align: right;
}

.invoice-box table tr.top table td {
  padding-bottom: 20px;
}

.invoice-box table tr.top table td.title {
  font-size: 45px;
  line-height: 45px;
  color: #333;
}

.invoice-box table tr.information table td {
  padding-bottom: 40px;
}

.invoice-box table tr.heading td {
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
}

.invoice-box table tr.details td {
  padding-bottom: 20px;
}

.invoice-box table tr.receipt td {
  border-bottom: 1px solid #eee;
}

.invoice-box table tr.receipt.last td {
  border-bottom: none;
}

.invoice-box table tr.receipt input {
  padding-left: 10px;
}

.invoice-box table tr.receipt td:first-child input {
  margin-left: 20px;
  width: 50%;
}

.invoice-box table tr.total td:nth-child(2) {
  border-top: 2px solid #eee;
  font-weight: bold;
}

.invoice-box input[type="number"] {
  width: 100px;
}

@media only screen and (max-width: 600px) {
  .invoice-box table tr.top table td {
    width: 100%;
    display: block;
    text-align: center;
  }

  .invoice-box table tr.information table td {
    width: 100%;
    display: block;
    text-align: center;
  }
}

/** RTL **/
.rtl {
  direction: rtl;
  font-family: Tahoma, "Helvetica Neue", "Helvetica", Helvetica, Arial,
    sans-serif;
}

.rtl table {
  text-align: right;
}

.rtl table tr td:nth-child(2) {
  text-align: left;
}
.button {
  padding: 5px 25px;
  font-size: 24px;
  text-align: center;
  cursor: pointer;
  outline: none;
  color: #fff;
  background-color: #4CAF50;
  border: none;
  border-radius: 15px;
  box-shadow: 0 9px #999;
}

.button:hover {background-color: #3e8e41}

.button:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}

</style>
<script>
import axios from "axios";

export default {
  data: function() {
    return {
      receipt: {},
      receipts: [{ }],

      json_fields: {},
      json_data: [],

      json_meta: [
          [
              {
                  'key': 'charset',
                  'value': 'utf-8'
              }
          ]
      ],


    };
  },
  computed: {
    total() {
      return this.receipts.reduce(
        // (acc, receipt) => acc + receipt.price * receipt.quantity,
        // 0
      );
    }
  },
  created: function() {
    axios.get("/api/receipts/" + this.$route.params.id).then(response => {
      this.receipt = response.data;


      this.json_fields = {

          'Date': 'date',
          
          'Business Name': 'business_name',

          'Phone Number': 'phone_number',

          'Address': 'address',
          'Subtotal': 'subtotal',
          'Tax': 'tax',
          'Total': 'total',
          'You Save': 'you_save',





          // 'Telephone 2' : {
          //     field: 'phone.landline',
          //     callback: (value) => {
          //         return `Landline Phone - ${value}`;
          //     }
          // },
      };
      
      this.json_data = [
          {
              'date': this.receipt.date,
              'business_name': this.receipt.business_name,
              'phone_number': this.receipt.phone_number,
              'address': this.receipt.address,
              'subtotal': this.receipt.subtotal,
              'tax': this.receipt.tax,
              'total': this.receipt.total,
              'you_save': this.receipt.you_save,
              

              
          }
      ]

      console.log('Created', this.receipt);
    });
  },
  methods: {
    addRow() {
      this.receipts.push({ description: "", quantity: 1, price: 0 });
    },

    destroyReceipt: function(receipt) {
      axios.delete("/api/receipts/" + receipt.id).then(response => {
        console.log("Successfully destroyed receipt", response.data);
        this.$router.push("/");
      });
    }
  },
  filters: {
    currency(value) {
      // return value.toFixed(2);
      return value;
    }
  }
};
</script>




