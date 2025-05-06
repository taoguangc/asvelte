<template>
  <section class="grid h-min w-full grid-cols-8 grid-rows-[min-content] justify-center gap-3 overflow-visible px-6 md:px-0" id="profile">
    <div class="col-span-8 overflow-hidden rounded-2xl md:col-span-3" data-in="zoomIn">
      <slot name="hero-image"></slot>
    </div>
    <div class="col-span-8 rounded-2xl border border-neutral-200 bg-white p-6 md:col-span-5" data-in="zoomIn">
      <div class="mb-8 inline-block rounded-lg border border-neutral-200 bg-neutral-100 p-3">
        <slot name="section-icon"></slot>
      </div>
      <h1 class="mb-4 text-xl font-medium">Professional Profile</h1>
      <p class="text-content text-sm font-medium">
        Accomplished Senior Data Scientist & Business Consultant with a proven track record of leveraging advanced analytics to drive strategic decision-making
        and optimize business processes. Demonstrated expertise in developing innovative solutions to complex problems, coupled with exceptional communication
        skills to effectively convey insights to stakeholders at all levels.
      </p>
      <div class="text-content mt-6 flex flex-row items-center gap-1 text-xs">Based in Phoenix, Arizona, USA.</div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Hero',
  props: {
    image: {
      type: Object as () => {
        src: string
        width: number
        height: number
        format: string
      },
      required: false
    }
  }
})
</script>
