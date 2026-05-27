import { defineManifest } from "@journals/mf-contract";

export const manifest = defineManifest({
  name: "mf-login",
  version: "0.0.1",
  framework: "react",
  port: 3001,
  components: [
    {
      name: "Login",
      description: "Formulario de identificacion del usuario",
      props: [
        {
          name: "emit",
          type: "function",
          required: true,
          description: "Event emitter del Shell",
        },
      ],
    },
  ],
  events: [
    {
      event: "login:submit",
      description: "Usuario completo el formulario de identificacion",
      direction: "emits",
      payload: {
        docType: { type: "string", description: "Tipo de documento (cc/ce/pa)" },
        docNumber: { type: "string", description: "Numero de documento" },
        userId: { type: "number", description: "ID del usuario" },
      },
    },
  ],
});
