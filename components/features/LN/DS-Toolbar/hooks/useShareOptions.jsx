import { useEffect, useState } from 'react';

/**
 * Custom hook para manejar la lógica de compartir opciones
 * @param {Object} params
 * @param {boolean} params.isShareOpen - Estado del popover de compartir
 * @param {Function} params.setIsShareOpen - Función para controlar el estado del popover
 * @param {Object} params.shareData - Datos necesarios para compartir (requestUri, host, title, mobileTitle)
 * @returns {Object} { copied, handleShareClick }
 */
const useShareOptions = ({ isShareOpen, setIsShareOpen, shareData }) => {
    const [copied, setCopied] = useState(false);

    const handleShareClick = option => {
        option.onClick({
            ...shareData,
            setCopied
        });

        // Cerrar inmediatamente si NO es el botón de copiar
        if (option.id !== 'share_option_link') {
            setIsShareOpen(false);
        }
    };

    // Cerrar el popover después de 2 segundos cuando se copia
    useEffect(() => {
        if (!copied) return undefined;

        const timeoutId = setTimeout(() => {
            setIsShareOpen(false);
        }, 2000);

        return () => clearTimeout(timeoutId);
    }, [copied, setIsShareOpen]);

    // Resetear el estado cuando se cierra el popover
    useEffect(() => {
        if (!isShareOpen) {
            setCopied(false);
        }
    }, [isShareOpen]);

    return {
        copied,
        handleShareClick
    };
};

export default useShareOptions;
