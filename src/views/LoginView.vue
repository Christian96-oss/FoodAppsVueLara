<template lang="">
  <div class="container">
    <div class="row vh-100 justify-content-center align-items-center login-container">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header text-center">Login</div>
          <div class="card-body">
            <form @submit.prevent>
              <div class="form-group mb-3">
                <label for="email">Email</label>
                <input type="email" v-model="email" class="form-control" id="email" placeholder="Enter Email" required />
              </div>
              <div class="form-group mb-3">
                <label for="password">Password</label>
                <input type="password" v-model="password" class="form-control" id="password" placeholder="Enter Password" required />
              </div>
              <button @click="login" class="btn btn-primary btn-block form-control">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import router from "@/router";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  mounted() {
    // Jika pengguna sudah login, langsung arahkan ke halaman 'home'
    const token = localStorage.getItem("token");
    if (token) {
      router.push({ name: "home" });
    }
  },
  methods: {
    login() {
      axios
        .post("http://localhost/food-order-api/public/api/auth/login", {
          email: this.email,
          password: this.password,
        })
        .then(function (response) {
          // Simpan data pengguna di localStorage
          localStorage.setItem("email", response.data.data.email);
          localStorage.setItem("name", response.data.data.name);
          localStorage.setItem("role_id", response.data.data.role_id);
          localStorage.setItem("token", response.data.data.token);

          // Arahkan ke halaman 'home'
          router.push({ name: "home" });
        })
        .catch(function (error) {
          console.log(error);
          console.log("Login error");
        });
    },
  },
};
</script>
<style lang=""></style>
