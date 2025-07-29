import { useState, useEffect } from 'react';

const useInputListener = (initialValue = '') => {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState({ hasError: false, message: '' });

    const handleInputChange = event => {
        const inputValue = event?.target?.value || '';

        setValue(inputValue);

        if (inputValue.length === 0) {
            setError({
                hasError: true,
                message: 'Completa el nombre de la colección para continuar'
            });
        } else if (inputValue.length > 45) {
            setError({
                hasError: true,
                message: 'Máximo 45 caracteres'
            });
        } else {
            setError({ hasError: false, message: '' });
        }
    };

    const restoreInputValue = () => {
        setValue(initialValue);
        setError({ hasError: false, message: '' });
    };

    useEffect(() => () => restoreInputValue(), []);

    return {
        value,
        onChange: handleInputChange,
        error,
        restoreInputValue,
        setValue
    };
};

export default useInputListener;
