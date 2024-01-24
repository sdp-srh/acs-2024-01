<template>
  <div>
    <h2>Google Search Trends ({{ trends.length }})</h2>
    <ul v-if="trends.length">
      <li v-for="trend in trends">
        <b>{{ trend.Top_Term}}</b> ({{ trend.Day.value }})
      </li>
    </ul>
    <!--
    <h1>Top Search: {{ trends ? trends[0].Top_Term : 'Loading Data' }}</h1>
    -->
  </div>
  
  
</template>

<style>
li {
  list-style-type: none;
}
</style>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'GoogleTrendsView',
  data() {
    return {
      trends: []
    };
  },
  methods: {
    async fetchTrends() {
      try {
        const response = await fetch('/api/google-trends');
        const data = await response.json();
        console.log(data)
        this.trends = data.results
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted() {
    this.fetchTrends();
  }
});
</script>