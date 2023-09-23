import { oidcSettings } from "./config/oidc";
import { createUserStore } from './pinia-oidc'

export const useUser = createUserStore(oidcSettings);