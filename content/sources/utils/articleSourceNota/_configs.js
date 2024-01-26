import addGalleryData from './cachedCalls/addGalleryData';
import { formatElementText, formatInterstitialLink } from './_helper';
import convertVideoArcToJw from './cachedCalls/convertVideoArcToJW';
// import addFollowAnotherNoteData from '../../articleSourceNota/cachedCalls/addFollowAnotherNoteData';
import addFollowAnotherNoteData from './cachedCalls/addFollowAnotherNoteData';
import get from '../../../../components/private/common/utils/get';

export const configPromoItems = {
    video: ({ cachedCall, element, arcSite }) =>
        convertVideoArcToJw(element, arcSite, cachedCall),
    gallery: ({ cachedCall, element, arcSite }) =>
        addGalleryData(cachedCall, element, arcSite)
};

export const configCallbackContentElements = {
    // agregar custom_embed de la nacion (se agrupa)

    gallery: ({ cachedCall, element, arcSite } = {}) => {
        return addGalleryData(cachedCall, element, arcSite);
    },
    text: ({ element = {} } = {}) => {
        return formatElementText(element);
    },
    interstitial_link: ({ element = {} } = {}) => {
        const interstitialLink = get(element, 'url', '');
        const validUrl = formatInterstitialLink(interstitialLink);

        return validUrl && { ...element, url: validUrl };
    },
    video: ({ element, arcSite, cachedCall } = {}) => {
        return convertVideoArcToJw(element, arcSite, cachedCall);
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
