import { createVuetify } from "vuetify";
import { md3 } from "vuetify/blueprints";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    blueprint: md3,
    components,
    directives,
    ssr: true,
    theme: {
      defaultTheme: 'dark'
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
