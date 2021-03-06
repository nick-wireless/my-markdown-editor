<template>
    <nav class="is-primary panel">
        <p class="panel-tabs">
            <a v-for="period in periods" :key="period" data-test="period"
              :class="[ period === selectedPeriod ? 'is-active' : '' ]"
              @click="setPeriod(period)"
            >
                {{ period }}
            </a>
        </p>
       <TimelinePost v-for="post in posts" :key="post.id" :post="post" />
    </nav>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue' // allows type definitions within the component.

import { Period, Post } from './types';
import { todayPost, thisWeek, thisMonth } from './mocks'
import moment from 'moment';
import TimelinePost from './TimelinePost.vue'

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

export default defineComponent({
    components: {
        TimelinePost
    },
  async setup() {
        const periods:Period[] = ['today', 'this week', 'this month']
        const selectedPeriod = ref<Period>('today')

        // note, without 'computed'... would only run once... with computed, tracks references.
        // also... took out types, leave to TS to figure out. 
        // return... function... omits {} as starts with objects.
        await delay(2000)
        const posts = computed( () => [ todayPost, thisWeek, thisMonth ].filter(post => {
            if(
                selectedPeriod.value === 'today' &&
                post.created.isAfter(moment().subtract(1, 'day'))
            ) {
                return true
            }
            if(
                selectedPeriod.value === 'this week' &&
                post.created.isAfter(moment().subtract(7, 'days'))
            ) {
                return true
            }
            if(
                selectedPeriod.value === 'this month' &&
                post.created.isAfter(moment().subtract(1, 'month'))
            ) {
                return true
            }
            return false
            })
        )

        const setPeriod = (period: Period) => {
            selectedPeriod.value = period
        }
        return {
            periods,
            selectedPeriod,
            setPeriod,
            posts
        }
    }
})

</script>

<style scoped>

</style>