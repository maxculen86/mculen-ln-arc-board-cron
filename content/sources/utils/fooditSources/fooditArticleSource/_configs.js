import addGalleryData from '../../articleSourceNota/cachedCalls/addGalleryData';
import { formatInterstitialLink } from '../../articleSourceNota/_helper';
import convertVideoArcToJw from '../../articleSourceNota/cachedCalls/convertVideoArcToJW';
import addFollowAnotherNoteData from '../../articleSourceNota/cachedCalls/addFollowAnotherNoteData';
import get from '../../../../../components/private/common/utils/get';
import { transformElementText } from '.';

export const configPromoItems = {
    video: ({ element }) => convertVideoArcToJw(element, arcSite, cachedCall)
};

export const configCallbackContentElements = {
    text: props => transformElementText(props),
    interstitial_link: ({ element = {} } = {}) => {
        const interstitialLink = get(element, 'url', '');
        const validUrl = formatInterstitialLink(interstitialLink);

        return validUrl && { ...element, url: validUrl };
    },
    custom_embed: ({ element }) =>
        get(element, 'subtype', '') !== 'custom-parallax' && element,
    video: ({ element, arcSite, cachedCall } = {}) => {
        return convertVideoArcToJw(element, arcSite, cachedCall);
    },
    list: ({ element, withSponsoredLink } = {}) => {
        return {
            ...element,
            items: get(element, 'items', []).map(item =>
                transformElementText({
                    element: item,
                    withSponsoredLink
                })
            )
        };
    }
};

const callbacksByTypeReference = {
    story: ({ cachedCall, element, arcSite } = {}) => {
        return addFollowAnotherNoteData(cachedCall, element, arcSite);
    }
};

export const configCallbacksRelatedContent = {
    reference: ({ cachedCall, element, arcSite } = {}) => {
        const selectedCallback =
            callbacksByTypeReference[get(element, 'referent.type', '')];

        if (selectedCallback) {
            return selectedCallback({ cachedCall, element, arcSite });
        }

        return element;
    }
};
