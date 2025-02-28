import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import About from "../components/About.vue"; 
import FAQS from '@/components/FAQS.vue';
import StockDashboard from '@/components/StockDashboard.vue';
import StockDetails from '@/components/StockDetails.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: "/about", 
    name: "About",
    component: About,
  },
  {
    path: "/faqs",
    name : "FAQS",
    component: FAQS,
  },
  {
    path: "/",
    name : "Home",
    component: StockDashboard,
  },
  {
    path: "/stock/:symbol",
    name: "StockDetails",
    component: StockDetails,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
