import { useState, useEffect } from 'react';
import { handleEventWords, findObjectGlossary } from '../helpers';
import { useDisclosure } from '@ln/hooks';

export const useDialog = glossaryData => {
    const defaultDialogData = { key: '', show: false, value: '' };
    const [dialogData, setDialogData] = useState(defaultDialogData);
    const { onOpen, onClose, isOpen } = useDisclosure();

    const { show, key, value } = dialogData;

    const updateDialogData = args => {
        if (args?.event?.type === 'mouseleave' || window?.innerWidth > 1279)
            return;

        const objectGlossary = findObjectGlossary(glossaryData, args?.key);

        setDialogData({
            key: args?.key,
            show: args?.show,
            value: objectGlossary?.value || ''
        });

        handleEventWords(args?.key);
    };

    useEffect(() => {
        window?.LN.observable.subscribe('handleGlossary', updateDialogData);
        if (show) {
            onOpen();
        } else {
            onClose();
        }

        return () => {
            window?.LN.observable.unsubscribe(
                'handleGlossary',
                updateDialogData
            );
        };
    }, [dialogData]);

    return { isOpen, onClose, key, value };
};
