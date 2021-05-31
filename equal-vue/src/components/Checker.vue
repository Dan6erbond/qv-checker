<template>
  <div class="checker">
    <it-button type="primary" html-type="submit">Button</it-button>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue";
  import { useCountdown } from "@/hooks/useCountdown";
  import { QvKandidat } from "@/types/api";

  export default defineComponent({
    name: "HelloWorld",
    setup: () => {
      const results = ref<QvKandidat>({} as QvKandidat);
      const ahvNr = ref("");
      const birthdate = ref("");
      const editing = ref(true);
      const countdownTime = 5 * 60;

      const { start, countdown } = useCountdown(countdownTime, async () => {
        const res = await fetch(
          "https://www.ag.ch/app/qvserviceapi/services/qv_info/kandidat",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ahvNr: ahvNr.value,
              birthdate: birthdate.value,
            }),
          },
        );
        results.value = await res.json();
        start();
      });

      const submit = () => {
        if (ahvNr.value && birthdate.value) {
          editing.value = false;
          start();
        }
      };

      return {
        ahvNr,
        birthdate,
        editing,
        submit,
        results,
        countdown,
        countdownTime,
      };
    },
  });
</script>

<style scoped>
  .checker {
    padding: 2rem;
  }

  .submit-container {
    display: flex;
    flex-direction: row-reverse;
  }
</style>
