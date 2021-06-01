<template>
  <div class="pa-4">
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
      <div class="row justify--end">
        <va-button type="submit">Submit</va-button>
      </div>
    </va-form>
    <va-card v-else>
      <va-card-title>Results</va-card-title>
      <va-card-content>
        <va-list-item>
          <va-list-item-section> First Name </va-list-item-section>
          <va-list-item-section>
            <va-list-item-label class="row justify--space-between" caption>
              <span v-if="results">{{ results.vorname }}</span>
              <va-progress-circle size="1rem" indeterminate v-if="loading" />
            </va-list-item-label>
          </va-list-item-section>
        </va-list-item>
        <va-list-item>
          <va-list-item-section> Last Name </va-list-item-section>
          <va-list-item-section>
            <va-list-item-label class="row justify--space-between" caption>
              <span v-if="results">{{ results.name }}</span>
              <va-progress-circle size="1rem" indeterminate v-if="loading" />
            </va-list-item-label>
          </va-list-item-section>
        </va-list-item>
        <va-list-item>
          <va-list-item-section> Job Title </va-list-item-section>
          <va-list-item-section>
            <va-list-item-label class="row justify--space-between" caption>
              <span v-if="results">
                {{ results.berufBezeichnung }}
              </span>
              <va-progress-circle size="1rem" indeterminate v-if="loading" />
            </va-list-item-label>
          </va-list-item-section>
        </va-list-item>
        <va-list-item>
          <va-list-item-section> Result </va-list-item-section>
          <va-list-item-section>
            <va-list-item-label class="row justify--space-between" caption>
              <span v-if="results">
                {{ results.freigabeResultat }}
              </span>
              <va-progress-circle size="1rem" indeterminate v-if="loading" />
            </va-list-item-label>
          </va-list-item-section>
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
  import { useCountdown } from "@/hooks/useCountdown";
  import { useQvResults } from "@/hooks/useQvResults";
  import { useToast } from "@/hooks/useToast";
  import { defineComponent, ref, watch } from "vue";

  export default defineComponent({
    name: "HelloWorld",
    setup: () => {
      const ahvNr = ref("");
      const birthdate = ref("");
      const editing = ref(true);
      const countdownTime = 5 * 60;
      const { data: results, load, loading, error } = useQvResults();
      const toast = useToast();

      const { start, countdown } = useCountdown(countdownTime, async () => {
        await load({
          ahvNr: ahvNr.value,
          birthdate: birthdate.value,
        });
        start();
      });

      const submit = async () => {
        if (ahvNr.value && birthdate.value) {
          editing.value = false;
          await load({
            ahvNr: ahvNr.value,
            birthdate: birthdate.value,
          });
          start();
        }
      };

      watch(error, (error, prevError) => {
        console.error(error);
        if (error && error !== prevError) {
          toast.init({
            title: "Error!",
            message: error.message ?? JSON.stringify(error, null, 2),
            color: "danger",
          });
        }
      });

      return {
        ahvNr,
        birthdate,
        editing,
        submit,
        results,
        countdown,
        countdownTime,
        loading,
      };
    },
  });
</script>
