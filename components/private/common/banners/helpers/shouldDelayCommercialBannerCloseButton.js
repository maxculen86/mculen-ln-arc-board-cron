import { getSectionOfRequestUri } from '../../utils/outputTypeHelper';

const shouldDelayCommercialBannerCloseButton = ({
    slotId = '',
    requestUri = ''
} = {}) =>
    slotId.includes('comercial') &&
    getSectionOfRequestUri(requestUri) === 'lifestyle';

export default shouldDelayCommercialBannerCloseButton;
