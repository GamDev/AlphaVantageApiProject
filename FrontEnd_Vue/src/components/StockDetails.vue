<template>
    <div class="container mt-4">
      <h2 class="text-center mb-4">Stock Details: {{ stockSymbol }}</h2>
  
     <div>
        <h3 class="text-center mt-4">Company Overview</h3>
        <CompanyOverview :symbol="stockSymbol" />
      </div>
      <StockIntradayChart :symbol="stockSymbol" />
     
    </div>
  </template>
  
  <script>
  import { ref, watch } from "vue";
  import { useRoute } from "vue-router";
  import CompanyOverview from "@/components/CompanyOverview.vue"; // Import the component
  import StockIntradayChart from "@/components/StockIntradayChart.vue"; // Import the IntradayChart component

  export default {
    components: { CompanyOverview , StockIntradayChart},
    setup() {
      const route = useRoute();
      const stockSymbol = ref(route.params.symbol);
      
      // Watch for changes in the route parameter to update the symbol
      watch(() => route.params.symbol, (newSymbol) => {
        stockSymbol.value = newSymbol;
      });
  
      return { stockSymbol };
    },
  };
  </script>
  
  <style scoped>
  .container {
    background: var(--bg-color);
    color: var(--text-color);
    padding: 20px;
    border-radius: 10px;
  }

  </style>
  