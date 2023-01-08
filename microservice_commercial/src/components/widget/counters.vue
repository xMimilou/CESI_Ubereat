<script setup lang="ts">
defineProps<{
  title: string
  query: string
}>()
</script>

<template>

  <div class="counters widget">
    <div class="counters__title">
      <h3>{{ title }}</h3>
    </div>
    <div class="counters__content">
      <div class="counters__content__item">
        <div class="counters__content__item__text">
          <h3>Nombre de {{ title }}</h3>
          <div class="display_val">
            <h1>{{ count }}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts">

export default{
  name: "counters",
  props: {
    title: {
      type: String,
      required: true
    },
    query: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      count: 10
    }
  },
  mounted() {
    this.getCount()
  },
  methods: {
    getCount() {
      fetch(`http://localhost:3000/${this.query}`)
        .then(res => res.json())
        .then(data => {
          this.count = data.length
        })
    }
  }
}

</script>

<style scoped>

.display_val {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  font-size: 15px;
}

/* drow line after title */
.counters__title::after {
  content: "";
  display: block;
  width: 70%;
  height: 2px;
  background-color: hsla(0, 0%, 59%, 0.2);
  margin: 0 auto;
  /* vertical align center */
  margin-top: 12px;
}

.counters__title {
  display: flex;
  flex: 1;
  width: 100%;
  margin: 20px auto;
  line-height: 1em;
  font-weight: 50px;
  font-size: 20px;
  height: 20%;
  justify-content: start;
  color: hsla(160, 100%, 37%, 1);
}


/* .counters__title {
  display: flex;
  flex: 1;
  width: 70%;
  margin: 20px auto;
  line-height: 1em;
  font-weight: 50px;
  font-size: 20px;
  height: 20%;
  justify-content: start;
  color: hsla(160, 100%, 37%, 1);
} */



.counters {
  width: 100%;
  height: 300px;
  max-height: 300px;
  background-color: var(--color-widget);
  border-radius: 10px;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}



.counters__content {
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.counters__content__item {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.counters__content__item__number {
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.counters__content__item__number h1 {
  font-size: 2rem;
  font-weight: 500;
  color: var(--color-text);
}

.counters__content__item__text {
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.counters__content__item__text h3 {
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-text);
}



</style>

