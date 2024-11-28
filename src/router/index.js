import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import OrderView from "../views/OrderView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: true }, // Pastikan hanya bisa diakses jika sudah login
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/order",
      name: "order",
      component: OrderView,
      meta: { requiresAuth: true }, // Pastikan hanya bisa diakses jika sudah login
    },
    // Penanganan untuk rute tidak ditemukan (optional)
    {
      path: "/:catchAll(.*)",
      redirect: "/login", // Redirect ke login jika rute tidak ada
    },
  ],
});

// Navigation guard untuk memeriksa autentikasi
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token"); // Periksa apakah token ada di localStorage
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      console.log("Redirecting to login");
      next({ name: "login" }); // Arahkan ke halaman login jika belum login
    } else {
      next(); // Lanjutkan jika sudah login
    }
  } else {
    next(); // Lanjutkan jika rute tidak membutuhkan autentikasi
  }
});

export default router;
