import { useRef, useEffect } from 'react';

const useEventListener = (eventName, handler, element = window) => {
    // Crear una referencia que almacene el controlador
    const savedHandler = useRef();

    // Actualizar el valor de ref.current si cambia el handler para que obtenga siempre el último controlador
    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(
        () => {
            // Asegurar que el elemento sea compatible con addEventListener
            const isSupported = element && element.addEventListener;

            if (isSupported) {
                // Crear un eventListener que llama a la función de controlador almacenada en la referencia
                const eventListener = event => savedHandler.current(event);

                // addEventListener
                element.addEventListener(eventName, eventListener);

                // removeEventListener
                return () => {
                    element.removeEventListener(eventName, eventListener);
                };
            }
            return () => false;
        },
        [eventName, element] // Vuelve a ejecutar si eventName o element cambia
    );
};

export default useEventListener;
