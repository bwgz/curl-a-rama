export default (store, namespaced) => {

    const useOidc = store.useStore();
    
    return (to, from, next) => {
        if (false) {
            store.dispatch((namespaced ? namespaced + "/" : "") + "oidcCheckAccess", to).then((hasAccess) => {
                if (hasAccess) {
                    next();
                }
            });
        } else {
            next();
        }
    };
};
