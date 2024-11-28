<template lang="">
  <!-- ini navbar component-->
  <NavBar :name="userName" />
  <div>ini order</div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
import axios from "axios";
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
    this.userName = localStorage.getItem("name"); // Tetap bisa menampilkan nama pengguna yang disimpan di localStorage
    this.getItems();
  },
  methods: {
    getItems() {
      axios
        .get("http://localhost/food-order-api/public/api/item", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
          console.log("error fetch items");
        });
    },
  },
};
</script>
