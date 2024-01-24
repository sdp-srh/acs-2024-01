<template>
  <h2>English ⇄ German</h2>
  <div class="container">
  <div class="textarea-container">
    <textarea id="enTextArea" v-model="text.english" placeholder="Enter English text" cols="25" rows="12"></textarea>
  </div>

  <div class="buttons-container">
    <button :disabled="!text.english" @click="translateToGerman" id="en2deButton">To German</button>
    <br>
    <button :disabled="!text.german" @click="translateToEnglish" id="de2enButton">To English</button>
    <br>
    <button @click="clear">Reset</button>
  </div>

  <div class="textarea-container">
    <textarea id="deTextArea" v-model="text.german" placeholder="Hier den deutschen Text eingeben" cols="25" rows="12"></textarea>
  </div>
</div>

</template>

<style scoped>
textarea { font-size: 18px; }


.container {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.textarea-container {
  flex: 1;
}

.buttons-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}


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



<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TranslationView',
  data() {
    return {
      text: {
        english: "",
        german: ""
      }
    };
  },
  methods: {
    async translateToGerman() {
      try {
        console.log(this.text.english)
        const payload = { source: this.text.english }
        const response = await fetch('/api/en2de', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        })
        const result = await response.json();
        this.text.german = result.translation;
      } catch (error) {
        console.error(error);
      }
    },

    async translateToEnglish() {
      try {
        console.log(this.text.german)
        const payload = { source: this.text.german }
        const response = await fetch('/api/de2en', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        })
        const result = await response.json();
        this.text.english = result.translation;
      } catch (error) {
        console.error(error);
      }
    },
    clear() {
      this.text.english = ''
      this.text.german = ''
    }
  },
})
</script>
