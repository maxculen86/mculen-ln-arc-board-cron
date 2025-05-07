import { useState } from 'react';

const useTooltipVisibility = (timeout = 2750) => {
    const [isTooltipVisible, setIsTooltipVisible] = useState({});

    const handleTooltipVisibility = id => {
        setIsTooltipVisible(prev => ({ ...prev, [id]: true }));
        setTimeout(() => {
            setIsTooltipVisible(prev => ({ ...prev, [id]: false }));
        }, timeout);
    };

    return {
        isTooltipVisible,
        handleTooltipVisibility
    };
};
export default useTooltipVisibility;
