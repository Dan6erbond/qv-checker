<template>
  <div class="checker p-4">
    <va-form tag="form" @submit.prevent="submit" v-if="editing">
      <va-input
        class="mb-4"
        label="AHV-Nr."
        v-model="ahvNr"
        :rules="[(value) => (value && value.length > 0) || 'Field is required']"
        placeholder="756.####.####.##"
        :returnRaw="false"
        :mask="{
          delimiter: '.',
          blocks: [3, 4, 4, 2],
          numericOnly: true,
          prefix: '756',
        }"
        name="ahvnr"
      />
      <va-input
        class="mb-4"
        label="Birthdate"
        v-model="birthdate"
        :rules="[(value) => (value && value.length > 0) || 'Field is required']"
        placeholder="dd.mm.yyyy"
        :returnRaw="false"
        :mask="{ date: true, delimiter: '.', datePattern: ['d', 'm', 'Y'] }"
        name="birthday"
      />
      <div class="submit-container">
        <va-button type="submit">Submit</va-button>
      </div>
    </va-form>
    <va-card v-else>
      <va-card-title>Results</va-card-title>
      <va-card-content>
        <va-list-item>
          <va-list-item-section> First Name </va-list-item-section>
          <va-list-item-label caption>
            {{ results.vorname }}
          </va-list-item-label>
        </va-list-item>
        <va-list-item>
          <va-list-item-section> Last Name </va-list-item-section>
          <va-list-item-label caption> {{ results.name }} </va-list-item-label>
        </va-list-item>
        <va-list-item>
          <va-list-item-section> Job Title </va-list-item-section>
          <va-list-item-label caption>
            {{ results.berufBezeichnung }}
          </va-list-item-label>
        </va-list-item>
        <va-list-item>
          <va-list-item-section> Result </va-list-item-section>
          <va-list-item-label caption>
            {{ results.freigabeResultat }}
          </va-list-item-label>
        </va-list-item>
        <va-list-item>
          <va-progress-bar
            :model-value="((countdownTime - countdown) * 100) / countdownTime"
          />
        </va-list-item>
      </va-card-content>
    </va-card>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue";
  import { useCountdown } from "@/hooks/useCountdown";
  import { useQvResults } from "@/hooks/useQvResults";

  export default defineComponent({
    name: "HelloWorld",
    setup: () => {
      const ahvNr = ref("");
      const birthdate = ref("");
      const editing = ref(true);
      const countdownTime = 5 * 60;
      const { data: results, load } = useQvResults();

      const { start, countdown } = useCountdown(countdownTime, async () => {
        await load({
          ahvNr: ahvNr.value,
          birthdate: birthdate.value,
        });
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
