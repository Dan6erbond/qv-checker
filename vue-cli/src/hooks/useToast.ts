import { inject } from "vue";
import Notification from "vuestic-ui/dist/components/vuestic-components/va-toast";

export const useToast = () => {
  return inject("toast") as Notification;
};
