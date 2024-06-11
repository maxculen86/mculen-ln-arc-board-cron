import { useState, useEffect } from 'react';

const useSelectListener = (initialValue = {}) => {
    const [selectValue, setSelectValue] = useState(initialValue);

    const handleSelectChange = (event = {}) => {
        event?.value && setSelectValue(event);
    };

    const restoreInputValue = () => setSelectValue(initialValue);

    useEffect(() => {
        return () => restoreInputValue();
    }, []);

    return { selectValue, onSelectChange: handleSelectChange };
};

export default useSelectListener;
