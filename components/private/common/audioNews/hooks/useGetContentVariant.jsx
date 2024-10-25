import { useState, useEffect } from 'react';
import handleCookie from '../../../LN/common/utils/handleCookie';

const useGetContentVariant = initialValue => {
    const { getCookie } = handleCookie();
    const [contentVariant, setContentVariant] = useState(
        getCookie('contentVariant') || initialValue
    );

    useEffect(() => {
        setContentVariant(initialValue);
    }, []);

    return { contentVariant, setContentVariant };
};

export default useGetContentVariant;
