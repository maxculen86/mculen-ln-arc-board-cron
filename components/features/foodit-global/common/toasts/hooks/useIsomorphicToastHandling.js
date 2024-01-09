import { useState, useEffect } from 'react';

export default function useIsomorphicToastHandling({ component: Component }) {
    const [toasts, setNewToast] = useState();

    const addToast = props => {
        setNewToast(<Component {...props} pauseOnHover closable />);
    };

    useEffect(() => {
        window.LN.observable.subscribe('addToast', addToast);

        return () => {
            window.LN.observable.unsubscribe('addToast', addToast);
        };
    }, []);

    return { toasts };
}
