import { useEffect, useRef } from 'react';
import { useDisclosure } from '@ln/hooks';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';

const useIaVisibility = () => {
    const { isOpen, onOpen, onClose } = useDisclosure(false);

    const containerIaToolsRef = useRef(null);

    const handleClose = () => {
        if (typeof window !== 'undefined' && window.LN?.observable) {
            window.LN.observable.publish('iaClosed', { closed: true });
            addEventToDataLayerV2({
                event: 'e_linkclick',
                action: 'IA',
                category: 'nota_ln9',
                label: 'cerrar_ia'
            });
            onClose();
        }
    };

    useEffect(() => {
        const handleShowIa = data =>
            data?.show !== undefined && data.show ? onOpen() : onClose();

        window?.LN?.observable.subscribe('showIa', handleShowIa);

        return () => {
            window?.LN?.observable.unsubscribe('showIa', handleShowIa);
            handleClose();
        };
    }, []);

    useEffect(() => {
        if (isOpen && containerIaToolsRef?.current) {
            containerIaToolsRef?.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }, [isOpen, containerIaToolsRef?.current]);

    return { isOpen, handleClose, containerIaToolsRef };
};

export default useIaVisibility;
