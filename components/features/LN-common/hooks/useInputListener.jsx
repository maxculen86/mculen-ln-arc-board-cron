import { useState, useEffect } from 'react';

const useInputListener = (initialValues = {}) => {
    const [values, setValues] = useState(initialValues);

    const handleInputChange = event => {
        const { name, value } = event?.target || {};
        if (name) {
            setValues(prev => ({ ...prev, [name]: value }));
        }
    };

    const restoreInputValues = () => {
        setValues(initialValues);
    };

    useEffect(() => () => restoreInputValues(), []);

    return {
        values,
        onChange: handleInputChange,
        restoreInputValues,
        setValues
    };
};

export default useInputListener;
