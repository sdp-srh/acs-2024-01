import { createWebHistory, createRouter } from "vue-router";
import TranslationView from "@/components/TranslationView.vue";
import TrendsView from "@/components/TrendsView.vue";

import Home from "@/views/HomeView.vue"

const routes = [

  {
    path: "/translation",
    name: "TranslationView",
    component: TranslationView,
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/trends",
    name: "TrendsView",
    component: TrendsView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;