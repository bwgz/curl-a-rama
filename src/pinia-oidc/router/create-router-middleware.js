export default (store, namespaced) => {
    return (to, from, next) => {
        if (false) {
            store.dispatch((namespaced ? namespaced + "/" : "") + "oidcCheckAccess", to).then((hasAccess) => {
                if (hasAccess) {
                    next();
                }
            });
        }
        else {
            next();
        }
    };
};
