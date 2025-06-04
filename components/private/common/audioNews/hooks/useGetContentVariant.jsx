import { useState, useEffect } from 'react';
import handleCookie from '../../../LN/common/utils/handleCookie';

const useGetContentVariant = () => {
    const { getCookie } = handleCookie();
    const [isSummary, setIsSummary] = useState(Boolean(getCookie('summary')));

    useEffect(() => {
        setIsSummary(Boolean(getCookie('summary')));
    }, []);

    return { isSummary, setIsSummary };
};

export default useGetContentVariant;
