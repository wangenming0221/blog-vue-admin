import { Directive, DirectiveBinding } from "vue";

export const hasRole: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
      const { value } = binding;
      if (value) {
        console.log(el)
        console.log(binding)
      } else {
        throw new Error("!!!");
      }
    },
};