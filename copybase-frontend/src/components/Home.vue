<script setup lang="ts">
export interface RoutesModel {
    link: string
    label: string
}
defineProps<{
  msg: string
  secondaryMessage: string
  routes: RoutesModel[]
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      {{ secondaryMessage }}
      
      <p class="spacer">

      <li v-for="route in routes">
        <RouterLink :to="route.link">{{ route.label }}</RouterLink>
      </li>
    </p>
    </h3>
  </div>
</template>

<style scoped>
.spacer {
  margin-top: 30px;
}
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
