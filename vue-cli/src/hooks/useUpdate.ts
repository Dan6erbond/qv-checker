import { ref } from "vue";

function isUpdateEvent(
  event: Event,
): event is CustomEvent<ServiceWorkerRegistration> {
  return "detail" in event;
}

export const useUpdate = (onUpdate?: () => void) => {
  const registration = ref<ServiceWorkerRegistration | null>(null);
  const updateExists = ref(false);
  const refreshing = ref(false);

  document.addEventListener(
    "swUpdated",
    (event: Event) => {
      if (isUpdateEvent(event)) {
        registration.value = event.detail;
        updateExists.value = true;
        onUpdate?.();
      }
    },
    {
      once: true,
    },
  );

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    // We'll also need to add 'refreshing' to our data originally set to false.
    if (refreshing.value) return;
    refreshing.value = true;
    // Here the actual reload of the page occurs
    window.location.reload();
  });

  const refreshApp = () => {
    updateExists.value = false;
    // Make sure we only send a 'skip waiting' message if the SW is waiting
    if (!registration.value?.waiting) return;
    // Send message to SW to skip the waiting and activate the new SW
    registration.value.waiting.postMessage({ type: "SKIP_WAITING" });
  };

  return { registration, updateExists, refreshApp };
};
