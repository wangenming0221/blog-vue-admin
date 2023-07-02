import { defineStore } from "pinia";
import { settingsState } from "../interface";

const useSettingsStore = defineStore("useSettingsStore", {
    state: (): settingsState => ({
        tableBordered: true,
    }),
    actions: {
     
    },
    getters: {},
  });
  
  export default useSettingsStore;