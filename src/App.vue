<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
  margin: 0px!important;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
}

#nav{
  margin-bottom: 20px;
}

.error {
  color: $errorColor;
}

.img-responsive {
  max-width: 100%;
  height: auto;
}

.trailer {
  margin-bottom: 20px;
  &--small {
    margin-bottom: 10px;
  }
}
.leader {
  margin-top: 20px;
  &--small {
    margin-top: 10px;
  }
}
</style>
