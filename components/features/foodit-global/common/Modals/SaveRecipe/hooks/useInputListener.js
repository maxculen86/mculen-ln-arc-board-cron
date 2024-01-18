import { useState, useEffect } from 'react';

const useInputListener = (initialValue = '') => {
    const [value, setValue] = useState(initialValue);

    const handleInputChange = event => {
        setValue(event);
    };

    const restoreInputValue = () => setValue(initialValue);

    useEffect(() => {
        return () => restoreInputValue();
    }, []);

    return { value, onChange: handleInputChange };
};

export default useInputListener;
