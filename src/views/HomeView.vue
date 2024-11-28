<template lang="">
  <!-- ini navbar component-->
  <NavBar :name="userName" />
  <div>ini home</div>
</template>
<script>
import router from "@/router";
import NavBar from "@/components/NavBar.vue";
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      userName: "",
    };
  },
  mounted() {
    // Validasi token di localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      // Jika tidak ada token, lempar ke halaman login
      router.push({ name: "login" });
    } else {
      // Ambil userName jika token ada
      this.userName = localStorage.getItem("name");
    }
  },
};
</script>
<style lang=""></style>
