/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_TOKEN: string;
  readonly VITE_API_URL: string;
  // outras variáveis de ambiente que usar
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
