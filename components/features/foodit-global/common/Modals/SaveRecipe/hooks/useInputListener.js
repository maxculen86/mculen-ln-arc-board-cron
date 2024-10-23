import { useState, useEffect } from 'react';

const useInputListener = (initialValue = '') => {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState({ hasError: false, message: '' });

    const handleInputChange = event => {
        const inputValue = event?.target?.value;

        if (inputValue.length > 0 && inputValue.length <= 45) {
            setValue(inputValue);
            setError({ hasError: false });
        } else {
            setError({
                hasError: true,
                message:
                    inputValue.length > 45
                        ? 'Máximo 45 caracteres'
                        : 'Completa el nombre de la colección para continuar'
            });
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
