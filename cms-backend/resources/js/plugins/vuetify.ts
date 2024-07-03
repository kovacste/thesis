/**
 * plugins/vuetify.ts
 *
 * Framework documentation.txt: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#667BC6 ',
          secondary: '#FDFFD2',
          accent: '#FFB4C2',
        },
      },
    },
  },
})
