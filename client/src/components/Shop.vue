<template>
  <div class="hello">
    <h1>Welcome to the Intent Shop</h1>
    <h4>Powered by Node.js with Express and Vue.js</h4>
    <p class="error" v-if="error">{{ error }}</p>
    <p class="cartTotal" v-if="total">
      Cart Total:  {{total}}
    </p>
    <button v-on:click="createCart()">Clear Cart</button>
    <h3>Products</h3>
    <div class="prod-container">
      <div class="row">
        <div class="product col"
        v-for="(prod, index) in products"
        v-bind:item="prod"
        v-bind:index="index"
        v-bind:key="prod.id"
        >
          <h3>{{ prod.description }}</h3>
          <p class="price">Unit Price: {{ '$' + prod.unit_price.toFixed(2) }}</p>
          <div v-if="Array.isArray(prod.volume_discounts) && prod.volume_discounts.length">
            <p class="price">Discount Price: {{prod.volume_discounts[0].number}} for {{ '$' + prod.volume_discounts[0].price.toFixed(2) }}</p>
          </div>
          <button v-on:click="addItem(prod.id)">Add to Cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Service from '../Service';

export default {
  name: 'Shop',
  data() {
    return {
      products: [{
          "id": "A",
          "description": "Apple",
          "unit_price": 2.0,
          "volume_discounts": [{
              "number": 4,
              "price": 7.0
          }]
      }, {
          "id": "B",
          "description": "Banana",
          "unit_price": 12.0,
          "volume_discounts": []
      }, {
          "id": "C",
          "description": "Cranberry",
          "unit_price": 1.25,
          "volume_discounts": [{
              "number": 6,
              "price": 6.0
          }]
      }, {
          "id": "D",
          "description": "Durian",
          "unit_price": 0.15,
          "volume_discounts": []
      }],
      total: '',
      error: '',
    }
  },
  methods: {
    async addItem(id) {
      await Service.addItem(id);
      let res = await Service.getTotal();
      this.total = res.total;
    },
    async createCart() {
      await Service.createCart();
      let res = await Service.getTotal();
      this.total = res.total;
    } 
  },
  async created() {
    try {
      let res = await Service.getTotal();
      this.total = res.total;
    } catch (err) {
      console.log(err);
      this.error = err.message;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.product {
  padding: 20px; 
  border-radius: 40px;
  box-shadow: 5px 10px;
  background: #D3D3D3;
  width: 10vw;
  height: 10vw;
  margin-left:auto;
  margin-right:auto;
}
.prod-container {
  padding: 30px;
  column-count: 4;
}
</style>
