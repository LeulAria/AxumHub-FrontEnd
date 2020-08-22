<template>
  <div></div>
</template>

<script>
import Api from "@/api/Api";
export default {
  async mounted() {
    const loading = this.$vs.loading({
      text: "Loading...",
      type: "circles"
    });
    try {
      const code = this.$route.query.code;
      const response = await Api.post("/users/etp", { code: code });
      this.$store
        .dispatch("users/loginWithIdentityProvider", response.data)
        .then(res => {
          this.$vs.notification({
            icon: "<i class='bx bx-bell' ></i>",
            color: "primary",
            position: "top-right",
            title: "Welcome",
            text: `Success: Welcome again to axumhb`
          });
        });
      loading.close();

      this.$router.push({ name: "Dashboard" });
    } catch (err) {
      {
        loading.close();
        this.$vs.notification({
          icon: "<i class='bx bxs-bug' ></i>",
          color: "danger",
          position: "top-right",
          title: "Login Error",
          text: `Error: ${err.response.data.error}`
        });
        this.$router.push({ name: "Login" });
      }
    }
  }
};
</script>