<template>
  <header class="p-3" :style="{ backgroundColor: 'var(--header-bg)', color: 'var(--text-color)' }">
    <div class="container d-flex justify-content-between align-items-center">
      <h4>Stock Info System</h4>

      <ul class="nav">
        <li><router-link to="/" class="nav-link px-2">Home</router-link></li>
        <li><router-link to="/faqs" class="nav-link px-2">FAQs</router-link></li>
        <li><router-link to="/about" class="nav-link px-2">About</router-link></li>
      </ul>

      <button @click="$emit('toggle-theme')" class="theme-toggle">
        <i :class="getThemeIcon"></i>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  props: {
    theme: String,
  },
  computed: {
    getThemeIcon() {
      if (this.theme === "light-theme") return "bi bi-sun-fill";
      if (this.theme === "dark-theme") return "bi bi-moon-fill";
      return "bi bi-laptop"; // System theme icon
    },
  },
};
</script>

<style scoped>
.nav-link {
  color: var(--text-color) !important;
}

.theme-toggle {
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  color: var(--text-color);
}
</style>
