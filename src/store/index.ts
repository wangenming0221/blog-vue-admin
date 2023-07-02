import useUserStore from "./modules/user";
import useSettingsStore from "./modules/settings";

const useStore = () => ({
  user: useUserStore(),
  settings: useSettingsStore()
});

export default useStore;