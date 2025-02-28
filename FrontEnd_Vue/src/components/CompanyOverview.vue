<template>
   
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else class="container mt-4">
      <h2 class="text-xl font-semibold">{{ companyOverview.name }} ({{ companyOverview.symbol }})</h2>
       <p class="text-gray-500">{{ companyOverview.description }}</p> 
      <div class="container mt-4">
        <div><strong>Sector:</strong> {{ companyOverview.sector }}</div>
        <div><strong>Industry:</strong> {{ companyOverview.industry }}</div>
        <div><strong>Asset Type:</strong> {{ companyOverview.assetType }}</div>
        <div><strong>Market Cap:</strong> {{ companyOverview.marketCapitalization }}</div>
        <div><strong>EBITDA:</strong> {{ companyOverview.ebitda }}</div>
        <div><strong>Address:</strong> {{ companyOverview.address }}</div>
      </div> 
    </div>

  </template>

<script setup>
import axios from "axios";
import { ref, onMounted, watch, defineProps } from "vue";


const props = defineProps({
  symbol: String, // The stock symbol to fetch data for
});

const companyOverview = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchCompanyOverview = async () => {
  try {
    loading.value = true;
    console.log("fetchCompanyOverview Response: SSS");
    const response = await axios.get(`http://localhost:3000/stocks/company?symbol=${props.symbol}`);
    
    console.log("fetchCompanyOverview Response:", response.data); 
   companyOverview.value = response.data;
    console.log("fetchCompanyOverview value:", companyOverview.value); 
  } catch (err) {
    error.value = "Failed to fetch company overview.";
  } finally {
    loading.value = false;
  }
};

watch(() => props.symbol, fetchCompanyOverview);
onMounted(fetchCompanyOverview);
</script>


<style scoped>
  .container {
    background: var(--bg-color);
    color: var(--text-color);
    padding: 20px;
    border-radius: 10px;
  }
  
  .chart-container {
    width: 80%;
    margin: auto;
  }
</style>