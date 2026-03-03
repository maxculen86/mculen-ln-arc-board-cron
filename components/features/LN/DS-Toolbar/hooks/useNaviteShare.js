import { useCallback } from 'react';
import { getTwitterTitle } from '../../../../private/LN/common/utils/shareHelper';

const useNativeShare = ({ mobileTitle, basic, host, requestUri }) => {
    const shareNativeTrigger = useCallback(() => {
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

    return { shareNativeTrigger };
};

export default useNativeShare;
