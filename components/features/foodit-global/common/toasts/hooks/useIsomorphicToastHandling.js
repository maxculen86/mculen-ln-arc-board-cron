import { useState, useEffect } from 'react';
import IconSprite from '../../../../../features/private-global/common/iconSprite/IconSprite';

export default function useIsomorphicToastHandling({ component: Component }) {
    const [toasts, setNewToast] = useState();

    const getIconProps = variant => {
        if (variant === 'danger')
            return {
                name: 'system-danger',
                fill: '#C61B25'
            };
        return {
            name: 'system-check',
            fill: '#008759'
        };
    };

    const addToast = props => {
        const icon = <IconSprite {...getIconProps(props.variant)} />;
        setNewToast(<Component {...props} pauseOnHover closable icon={icon} />);
    };

    useEffect(() => {
        window.LN.observable.subscribe('addToast', addToast);

        return () => {
            window.LN.observable.unsubscribe('addToast', addToast);
        };
    }, []);

    return { toasts };
}
