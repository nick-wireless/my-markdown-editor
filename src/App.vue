<template>
  <section class="section">
    <div class="container">
      <Suspense>
        <template #default>
          <Timeline></Timeline>
        </template>
        <template #fallback>
          <Progress></Progress>
        </template>
      </Suspense>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Timeline from './Timeline.vue'
import Progress from './Progress.vue'

export default defineComponent({
  components: {
    Timeline,
    Progress
  },
  name: 'App'
})
</script>