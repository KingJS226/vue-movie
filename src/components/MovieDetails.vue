<template>
  <div class="details">
    <div v-if="error" class="error">{{error}}</div>
    <div v-if="showError">{{movie.Error}}</div>
    <div v-else>
      <div v-show="!loadingData" class="movie">
        <section class="movie__title">{{movie.Title}} ({{movie.Year}})</section>
        <section class="movie__poster">
          <img :src="movie.Poster" class="img-responsive">
        </section>
        <section class="movie__details">
          <div class="movie__details__plot">{{movie.Plot}}</div>
          <span>Actors:</span>
          {{movie.Actors}}
          <div>
            <span>Directed by:</span>
            {{movie.Director}}
          </div>
          <div>
            <span>Genre:</span>
            {{movie.Genre}}
          </div>
          <div>
            <span>Runtime:</span>
            {{movie.Runtime}}
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import config from "@/config";

export default {
  name: "MovieDetails",
  data() {
    return {
      movieId: this.propMovieId,
      movie: {},
      error: null,
      loadingData: true
    };
  },
  props: {
    propMovieId: String
  },
  computed: {
    showError() {
      return this.movie.Response && this.movie.Response === "False";
    }
  },
  created() {
    let url = `${config.baseApiUrl}${config.apiKey}&i=${
      this.movieId
    }&plot=full`;
    axios
      .get(url)
      .then(response => {
        this.movie = response.data;
        this.loadingData = false;
      })
      .catch(error => {
        this.error = error;
      });
  }
};
</script>

<style lang="scss" scoped>
.movie {
  margin-top: 50px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 25% auto;
  grid-template-rows: 60px auto;
  grid-template-areas:
    "header header"
    "right main";

  &__title {
    grid-area: header;
    font-size: 32px;
  }

  &__details {
    grid-area: main;
    justify-self: start;
    text-align: left;

    &__plot {
      margin-bottom: 10px;
    }

    & span {
      font-weight: bold;
    }
  }

  &__poster {
    grid-area: right;
  }
}
</style>
