import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { md3 } from "vuetify/blueprints";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    blueprint: md3,
    components,
    directives,
    ssr: true,
    theme: {
      defaultTheme: "light",
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
