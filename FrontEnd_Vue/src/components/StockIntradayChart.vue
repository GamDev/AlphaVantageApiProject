<template>
    <div class="charts-container">
      <!-- Close Price Bar Chart -->
      <div class="chart-container">
        <Bar v-if="closeChartData" :data="closeChartData" :options="chartOptions" />
      </div>
  
      <!-- High Price Line Chart -->
      <div class="chart-container">
        <Line v-if="highChartData" :data="highChartData" :options="chartOptions" />
      </div>
    </div>
  </template>
  
  <script>
 import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { Bar, Line } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, LineElement, PointElement, CategoryScale, LinearScale } from "chart.js";

// Register necessary components
ChartJS.register(Title, Tooltip, Legend, BarElement, LineElement, PointElement, CategoryScale, LinearScale);

export default {
  components: { Bar, Line },
  props: {
    symbol: String,
  },
  setup(props) {
    const closeChartData = ref(null);
    const highChartData = ref(null);

    async function fetchIntradayData() {
      try {
        const response = await axios.get(`http://localhost:3000/stocks/intraday?symbol=${props.symbol}&interval=60min`);

        // Format the data for Close price (Bar chart)
        closeChartData.value = {
          labels: response.data.map(item => item.timestamp), // X-axis labels (timestamps)
          datasets: [
            {
              label: "Stock Close (60min Interval)",
              data: response.data.map(item => parseFloat(item.close)), // Close price
              backgroundColor: "rgba(0,123,255,0.6)", // Bar color
            },
          ],
        };

        // Format the data for High price (Line chart)
        highChartData.value = {
          labels: response.data.map(item => item.timestamp), // X-axis labels (timestamps)
          datasets: [
            {
              label: "Stock High (60min Interval)",
              data: response.data.map(item => parseFloat(item.high)), // High price
              borderColor: "rgba(255,99,132,1)", // Line color
              backgroundColor: "rgba(255,99,132,0.2)", // Transparent line fill
              fill: true, // Fill under the line
            },
          ],
        };

      } catch (error) {
        console.error("Error fetching intraday data:", error);
      }
    }

    // Watch for symbol changes and fetch new data
    watch(() => props.symbol, (newSymbol) => {
      fetchIntradayData();
    });

    // Fetch data on component mount
    onMounted(fetchIntradayData);

    return {
      closeChartData,
      highChartData,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
      },
    };
  },
};

  </script>
  
  <style scoped>
  .charts-container {
    display: flex;
    flex-direction: column;
    gap: 20px; /* Adds space between the charts */
  }
  
  .chart-container {
    width: 100%;
    max-width: 1000px;
    margin: auto;
  }
  </style>
  