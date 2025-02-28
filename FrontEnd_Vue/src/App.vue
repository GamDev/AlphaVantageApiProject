<template>
  <div class="app-container" :class="theme">
    <HeaderComponent :theme="theme" @toggle-theme="toggleTheme" />
    <main class="content" :theme="theme" >
      <router-view :theme="theme" />
    </main>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from "./components/Header.vue";
import FooterComponent from "./components/Footer.vue";

export default {
  components: { HeaderComponent, FooterComponent },
  data() {
    return {
      theme: this.getInitialTheme(),
    };
  },
  methods: {
    toggleTheme() {
      if (this.theme === "light-theme") {
        this.theme = "dark-theme";
      } else if (this.theme === "dark-theme") {
        this.theme = "system-theme";
      } else {
        this.theme = "light-theme";
      }

      if (this.theme === "system-theme") {
        localStorage.removeItem("theme"); 
        this.applySystemTheme();
      } else {
        localStorage.setItem("theme", this.theme);
        document.documentElement.setAttribute("data-theme", this.theme);
      }
    },
    getInitialTheme() {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) return storedTheme;
      return "system-theme"; 
    },
    applySystemTheme() {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const systemTheme = prefersDark ? "dark-theme" : "light-theme";
      document.documentElement.setAttribute("data-theme", systemTheme);
    },
    handleSystemThemeChange(event) {
      if (this.theme === "system-theme") {
        this.applySystemTheme();
      }
    },
  },
  created() {
    if (this.theme === "system-theme") {
      this.applySystemTheme();
    } else {
      document.documentElement.setAttribute("data-theme", this.theme);
    }
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", this.handleSystemThemeChange);
  },
};
</script>

<style>

/* Define default (light) theme variables */
:root {
  --bg-color: #ffffff;
  --text-color: #000000;
  --header-bg: #f8f9fa;
  --footer-bg: #f8f9fa;
  --btn-bg: #007bff;
  --btn-text: #ffffff;
  --table-bg: #f9f9f9;
  --table-border: #ddd;
  --table-header-bg: #e0e0e0;
  --table-text-color: #000000;
 
}

/* Dark theme variables */
[data-theme="dark-theme"] {
  --bg-color: #121212;
  --text-color: #ffffff;
  --header-bg: #212529;
  --footer-bg: #212529;
  --btn-bg: #ff9800;
  --btn-text: #000000;
  --table-bg: #1e1e1e;
  --table-border: #444;
  --table-header-bg: #333;
  --table-text-color: #ffffff;


}

/* Apply global styles */
body {
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
}

.header, .footer {
  background-color: var(--header-bg);
}

button {
  background-color: var(--btn-bg);
  color: var(--btn-text);
}
/* Make the footer sticky */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Full viewport height */
}
.content {
  flex: 1; /* Pushes the footer down */
}
.footer {
  width: 100%;
  background-color: var(--footer-bg);
  color: var(--text-color);
  text-align: center;
  padding: 10px 0;
}
</style>
