import { defineManifest } from "@journals/lib-manifest";

export const manifest = defineManifest({
  name: "mf-login",
  version: "0.0.1",
  framework: "react",
  port: 3001,
  components: [
    {
      name: "Login",
      description: "Formulario de identificacion del usuario",
      props: [],
    },
    {
      name: "LoginWithCredentials",
      description: "Formulario de inicio de sesion con usuario y contrasena",
      props: [],
    },
  ],
  events: [
    {
      event: "mf-login:Login:submit",
      description: "Usuario completo el formulario de identificacion",
      direction: "emits",
      payload: {
        docType: { type: "string", description: "Tipo de documento (cc/ce/pa)" },
        docNumber: { type: "string", description: "Numero de documento" },
        userId: { type: "number", description: "ID del usuario" },
      },
    },
    {
      event: "mf-login:LoginWithCredentials:submit",
      description: "Usuario ingreso usuario y contrasena",
      direction: "emits",
      payload: {
        username: { type: "string", description: "Nombre de usuario" },
        userId: { type: "number", description: "ID del usuario" },
      },
    },
  ],
});

export type Manifest = typeof manifest;
