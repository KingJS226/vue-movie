<template>
    <movie-details :prop-movie-id='$route.params.id'></movie-details>
</template>

<script>
import MovieDetails from "@/components/MovieDetails.vue";

export default {
  name: "moviedetails",
  components: {
    MovieDetails
  }
};
</script>
