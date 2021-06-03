<template>
  <div class="pa-4">
    <va-form tag="form" @submit.prevent="submit" v-if="!isSignedIn">
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
      <va-checkbox class="mt-4" v-model="remember" label="Remember Me" />
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
          <va-progress-bar :model-value="countdownPercentage" />
        </va-list-item>
      </va-card-content>
    </va-card>
  </div>
</template>

<script lang="ts">
  import { useQvResults } from "@/hooks/useQvResults";
  import { useAccessInfo } from "@/hooks/useAccessInfo";
  import { useSignedIn } from "@/hooks/useSignedIn";
  import { computed, defineComponent, ref, watch } from "vue";

  export default defineComponent({
    name: "HelloWorld",
    setup: () => {
      const remember = ref(false);
      const { ahvNr, birthdate, clear } = useAccessInfo(remember);
      const pollTime = 5 * 60;
      const fetchParams = computed(() => ({
        ahvNr: ahvNr.value,
        birthdate: birthdate.value,
      }));
      const {
        start,
        data: results,
        loading,
        error,
        countdown,
        reset,
      } = useQvResults(pollTime, fetchParams);
      const { isSignedIn, signIn } = useSignedIn();

      const submit = async () => {
        if (ahvNr.value && birthdate.value) {
          signIn();
        }
      };

      watch(isSignedIn, (isSignedIn) => {
        if (isSignedIn) {
          start();
        } else {
          reset();
        }
      });

      watch(error, (error) => {
        console.error(error);
      });

      const countdownPercentage = computed(
        () => ((pollTime - countdown.value) * 100) / pollTime,
      );

      return {
        ahvNr,
        birthdate,
        submit,
        results,
        countdown,
        loading,
        countdownPercentage,
        remember,
        clear,
        isSignedIn,
      };
    },
  });
</script>
