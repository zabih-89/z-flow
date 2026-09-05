import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    appName: 'Codveda Explorer',

    developer: 'Zabihullah Ahmadi',

    description:
      'A modern Vue.js application built as part of the Codveda Technology Front-End Development Internship.',

    theme: 'cyan',
  }),

  getters: {
    projectInfo: (state) => ({
      name: state.appName,
      developer: state.developer,
      description: state.description,
    }),
  },

  actions: {
    setTheme(theme) {
      this.theme = theme
    },
  },
})