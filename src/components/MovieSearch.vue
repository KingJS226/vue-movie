<template>
  <div class="sigma-movie-search">
    <div class="search-field">
      <div class="movie-search">
        <input
          type="search"
          class="movie-search__input"
          v-model="searchString"
          @keyup.enter="searchMovie()" />
        <button type="button" class="movie-search__button" @click="searchMovie()">Search</button>
      </div>
    </div>

    <div v-if="error" class="error">{{error}}</div>
    <div v-if="hasError" class="error">{{searchResult.Error}}</div>
    <div v-if="searchResult && searchResult.Search">
      <div class="search-result">
        <!--<div v-for="(result, index) in searchResult.Search" :key="index" class="movie">-->
          <carousel-3d>
            <slide v-for="(result, index) in searchResult.Search" :index="index" :key="index" >
              <div class="movie__poster">
                <router-link :to="{name: 'moviedetails', params: {id: result.imdbID}}"><img :src="result.Poster"></router-link>
              </div>
            </slide>
          </carousel-3d>
        <!--</div>-->
      </div>
      <section class="pager__container">
        <span>Page:</span>
        <span
          v-for="pageNumber in totalPages"
          v-bind:key="pageNumber"
          @click="searchMovie(pageNumber)"
          class="pager"
          :class="{'pager--active':pageNumber === page}">
            {{pageNumber}}
          </span>
      </section>
      <div class="leader">Number of hits: {{searchResult.totalResults}}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import config from "@/config";
import { Carousel3d, Slide } from 'vue-carousel-3d';
const pageSize = 10;

export default {
  name: "MovieSearch",
  data() {
    return {
      searchString: "",
      searchResult: {},
      error: "",
      page: 1
    };
  },
  props: {},
  components: {
    Carousel3d,
    Slide
  },
  methods: {
    searchMovie(page) {
      this.page = page || 1;
      let url = `${config.baseApiUrl}${config.apiKey}&type=movie&s=${
        this.searchString
      }&page=${page}`;
      axios
        .get(url)
        .then(response => {
          this.searchResult = response.data;
          this.$store.dispatch("updateSearch", {
            searchString: this.searchString,
            searchResult: this.searchResult,
            page: this.page
          });
        })
        .catch(error => {
          this.error = error;
          throw error;
        });
    }
  },
  computed: {
    hasError() {
      return (
        this.searchResult.Response &&
        !JSON.parse(this.searchResult.Response.toLowerCase())
      );
    },
    totalPages() {
      if (JSON.parse(this.searchResult.Response.toLowerCase())) {
        let pages = Math.ceil(
          Number(this.searchResult.totalResults) / pageSize
        );
        return pages;
      }
      return 1;
    }
  },
  created() {
    this.searchString = this.$store.state.searchString;
    this.searchResult = this.$store.state.searchResult;
    this.page = this.$store.state.currentPage;
  }
};
</script>

<style lang="scss" scoped>
.search-field {
  display: flex;
  justify-content: center;
}

.movie-search {
  display: inline-flex;
  flex: 0 0 70%;
  border: solid 1px #d3cdcd;
  justify-content: center;
  flex-direction: row;

  &__input {
    -webkit-appearance: none;
    flex-grow: 2;
    padding: 10px;
    font-size: 22px;
    border: none;

    &:focus {
      outline: none;
    }
  }

  &__button {
    -webkit-appearance: none;
    border: none;
    background: $buttonColor;
    border: solid 1px $buttonColor;
    outline: solid 1px $buttonColor;
    color: white;
    width: 60px;

    &:focus {
      outline: none;
    }
  }
}

.search-result {
  margin-top: 30px;
  display: grid;
  grid-gap: 20px;

  @media screen and (min-width: 1024px) {
  }

  @media screen and (max-width: 768px) {
  }
}

.movie {
  text-align: left;
  display: grid;
  grid-gap: 10px;
  padding: 10px;
  border: solid 1px $shadowColor;
  box-shadow: $shadowColor 5px 5px 5px 2px;

  &__poster {
    img {
      max-width: 100%;
      height: auto;
    }
  }

  &__title {
    font-size: 1.7rem;
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;

    @media screen and (min-width: 1024px) {
      font-size: 1.5rem;
    }

    @media screen and (max-width: 768px) {
      font-size: 2rem;
    }
  }
}

.pager {
  &__container {
    text-align: left;
  }

  cursor: pointer;
  box-sizing: border-box;
  margin-right: 5px;

  &--active {
    font-size: x-large;
    font-weight: bold;
  }
}
</style>
