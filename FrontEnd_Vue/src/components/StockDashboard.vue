<template>
  <div :class="themeClass">
    <h2 class="text-center mb-10">Stock Dashboard</h2>

    <!-- Stock Table -->
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Description</th>
            <th>Weight (%)</th>
            <th>Action</th>
            <th>Favorite</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="holding in paginatedHoldings" :key="holding.symbol">
            <td>{{ holding.symbol }}</td>
            <td>{{ holding.description }}</td>
            <td>{{ parseFloat(holding.weight).toFixed(2) }}%</td>
           
           <td>
            <button @click="viewStockDetails(holding.symbol)" class="btn btn-primary">
              View Details
            </button>
            </td>
            <td>
                    <button @click="toggleFavorite(holding.symbol)" 
                      :class="{'btn-success': holding.isFavorite, 'btn-secondary': !holding.isFavorite}" 
                      class="btn">
                        {{ holding.isFavorite ? 'Unmark Favorite' : 'Mark Favorite' }}
                   </button>
             </td>
  </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Controls -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1" class="btn btn-secondary">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="btn btn-secondary">Next</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import { useRouter } from 'vue-router';
export default {
  setup() {
    const etfSymbol = "QQQ"; // Default ETF symbol (no user input)
    const holdings = ref([]);
    const currentPage = ref(1);
    const itemsPerPage = 10; // Show 10 per page
    const router = useRouter();
    // Fetch ETF Holdings
    const fetchHoldings = async () => {
      try {
        console.log("Fetching data from API...");
        const response = await axios.get(`http://localhost:3000/stocks/etf-holdings?symbol=${etfSymbol}`);
        console.log("API Response:", response.data);

        // Initialize holdings with API data and favorite status from localStorage
        holdings.value = response.data.map(holding => ({
          ...holding,
          isFavorite: getFavoriteFromStorage(holding.symbol), // Check localStorage for favorites
        }));
        
        currentPage.value = 1; // Reset to first page
      } catch (error) {
        console.error("Error fetching holdings:", error);
      }
    };

    // Fetch data automatically when component loads
    onMounted(fetchHoldings);

    // Pagination Computed Properties
    const totalPages = computed(() => Math.ceil(holdings.value.length / itemsPerPage));
    console.log(totalPages.value);
    const paginatedHoldings = computed(() => {
      // First, sort the holdings by isFavorite (favorites first)
      const sortedHoldings = [...holdings.value].sort((a, b) => b.isFavorite - a.isFavorite);

      // Then, apply pagination to the sorted holdings
      const start = (currentPage.value - 1) * itemsPerPage;
      return sortedHoldings.slice(start, start + itemsPerPage);
    });

    // Pagination Methods
    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    // View Stock Details (Route to Another Page)
    const viewStockDetails = (symbol) => {
      router.push(`/stock/${symbol}`);
    };
    const getChangeClass = (weight) => {
      return parseFloat(weight) >= 0.05 ? "text-success" : "text-danger";
    };
    const getFavoriteFromStorage = (symbol) => {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      return favorites.includes(symbol);
    };

    // Update localStorage with current favorites
    const updateFavoritesInStorage = () => {
      const favorites = holdings.value.filter(stock => stock.isFavorite).map(stock => stock.symbol);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    };
    const favoriteStocks = computed(() => {
      return holdings.value.filter(stock => stock.isFavorite);
    });
    const toggleFavorite = (symbol) => {
      const holding = holdings.value.find(stock => stock.symbol === symbol);
      if (holding) {
        holding.isFavorite = !holding.isFavorite; // Toggle the favorite status
        updateFavoritesInStorage(); // Update localStorage
      }
    };
    return {
      holdings,
      paginatedHoldings,
      currentPage,
      totalPages,
      nextPage,
      prevPage,
      viewStockDetails,
      getChangeClass,
      toggleFavorite,
      favoriteStocks,
    };
  },
};
</script>

<style scoped>
.table {
  background-color: var(--table-bg) !important;
  color: var( --text-color) !important;
  transition: background-color 0.3s, color 0.3s;
}

.table th {
  background-color: var(--table-header-bg);
  padding: 10px;
  text-align: left;
  color: var(--text-color);
}

.table td {
  padding: 10px;
  border-bottom: 1px solid var(--table-border);
  background-color: var(--table-header-bg);
  color: var( --table-text-color);
}
.btn-primary {
  background-color: var(--btn-bg);
  color: var(--btn-text);
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

</style>
