<template>
  <div class="home">
    <div class="hero">
    </div>  
    <movie-search></movie-search>
  </div>
</template>

<script>
// @ is an alias to /src
import MovieSearch from "@/components/MovieSearch.vue";

export default {
  name: "home",
  components: {
    MovieSearch
  }
};
</script>

<style lang="scss" scoped>
.hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  height: 300px;
  overflow: hidden;
  margin-bottom: 20px;
  background-image: url('../assets/RT_200EssentialMovies_731X200.jpg');
  background-size: cover;

  & h1{
    color: white;
    background: rgba(0, 0, 0, 0.5);
    margin: 0 auto;
    padding: 10px;
  }
}
</style>
