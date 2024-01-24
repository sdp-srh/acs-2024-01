
<template>
  <div>
    <div>
      <p>
        <h1>{{ menutitle }}</h1>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<router-link to="/home">Home</router-link>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<router-link to="/translation">Translation</router-link>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<router-link to="/trends">Trends</router-link>
      </p>
      <hr/>
      </div>

      <div>
        <router-view />
      </div>
    </div>
</template>

<script>
export default {
  name: 'Start',
  props: {
    menutitle: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}

  a {
    font-weight: bold;
    color: blue;
  }
</style>
