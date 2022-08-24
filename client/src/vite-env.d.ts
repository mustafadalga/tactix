/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE__REACT_APP_SERVER_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}