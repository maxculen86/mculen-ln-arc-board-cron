import { useState, useEffect } from 'react';

const useSelectListener = (initialValue = {}) => {
    const [selectValue, setSelectValue] = useState(initialValue);

    const handleSelectChange = (event = {}) => {
        if (event?.value) {
            setSelectValue(event);
        }
    };

    const restoreInputValue = () => setSelectValue(initialValue);

    useEffect(() => () => restoreInputValue(), []);

    return {
        selectValue,
        onSelectChange: handleSelectChange,
        restoreInputValue
    };
};

export default useSelectListener;
