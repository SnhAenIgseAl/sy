// src/store/index.ts
import type { App } from "vue";
import { createPinia } from "pinia"
import { createPersistedState } from 'pinia-plugin-persistedstate';

const createPersistUni = () => {
    return createPersistedState({
        storage: {
            getItem: uni.getStorageSync,
            setItem: uni.setStorageSync
        }
    })
}

const store = createPinia();
store.use(createPersistUni());

export * from './modules/tabIndex'
export * from './modules/user'

// 注册 Pinia
export function setupStore(app: App<Element>) {
  app.use(store); // 全局注册 Pinia
}