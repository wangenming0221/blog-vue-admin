import { defineStore } from "pinia";
import { removeToken, setToken } from "@/utils/token";
import { UserState } from "../interface";
import { LoginForm } from "@/api/login/types";
import { login } from "@/api/login";

const useUserStore = defineStore("useUserStore", {
  state: (): UserState => ({
    id: null,
  }),
  actions: {
    LogIn(LoginForm: LoginForm) {
      return new Promise((resolve, reject) => {
        login(LoginForm)
          .then(({ data }) => {
            if (data) {
             
            } 
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {},
});

export default useUserStore;