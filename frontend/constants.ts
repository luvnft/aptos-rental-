export const NETWORK = import.meta.env.VITE_APP_NETWORK ?? "testnet";
export const MODULE_ADDRESS = "0x6d1adc4ecf58b8d7f4cc72cca9922fd61af7078f42976f59a8e6de467d34572f";
export const CREATOR_ADDRESS = import.meta.env.VITE_COLLECTION_CREATOR_ADDRESS;
export const COLLECTION_ADDRESS = import.meta.env.VITE_COLLECTION_ADDRESS;
export const IS_DEV = Boolean(import.meta.env.DEV);
export const IS_PROD = Boolean(import.meta.env.PROD);
