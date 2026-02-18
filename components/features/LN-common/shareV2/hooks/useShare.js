import { useState, useCallback } from 'react';
import { getTwitterTitle } from '../../../../private/LN/common/utils/shareHelper';

const useShare = ({ mobileTitle, basic, host, requestUri }) => {
    const [copy, setCopy] = useState(false);

    const shareButton = useCallback(() => {
        const shareTitle = getTwitterTitle(mobileTitle, basic);
        const shareUrl = host.concat(requestUri);
        const shareData = {
            title: shareTitle,
            text: shareTitle,
            url: shareUrl
        };

        if (navigator && Boolean(navigator.canShare)) {
            navigator.share(shareData);
        }
    }, [mobileTitle, basic, host, requestUri]);

    return { copy, setCopy, shareButton };
};

export default useShare;
