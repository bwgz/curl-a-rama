import { oidcSettings } from "./config/oidc";
import { createUserStore } from './pinia-oidc'
import { createCurlingStore } from './curling'

export const useUser = createUserStore(oidcSettings);
export const useCurling = createCurlingStore();