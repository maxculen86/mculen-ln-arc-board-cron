import { useState } from 'react';
import { useDisclosure } from '@ln/hooks';
import { getStatusMessage } from '../../utils/bookmarkHelper';

export function useToast() {
    const {
        isOpen: isToastOpen,
        onOpen: openToast,
        onClose: closeToast
    } = useDisclosure(false);

    const [toastData, setToastData] = useState({
        title: '',
        description: '',
        status: '',
        timeout: 2750,
        buttonLabel: '',
        href: '',
        closable: true,
        pauseOnHover: true
    });

    const handleOperationComplete = (status, bookmarkContent) => {
        const toastConfig = getStatusMessage(status, bookmarkContent);
        setToastData(toastConfig);
    };

    return {
        isToastOpen,
        openToast,
        closeToast,
        toastData,
        handleOperationComplete
    };
}
