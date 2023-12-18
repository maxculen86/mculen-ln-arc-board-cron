import addGalleryData from '../../articleSourceNota/cachedCalls/addGalleryData';
import {
    formatElementText,
    formatInterstitialLink
} from '../../articleSourceNota/_helper';
import convertVideoArcToJw from '../../articleSourceNota/cachedCalls/convertVideoArcToJW';
import addFollowAnotherNoteData from '../../articleSourceNota/cachedCalls/addFollowAnotherNoteData';
import get from '../../../../../components/private/common/utils/get';
import { compose } from '../../../../../components/private/common/utils/functional';
import {
    replaceClassForMark,
    setExternalLinks,
    setOtherChar,
    setItalicText,
    setBoldText
} from '.';

export const configPromoItems = {
    video: ({ element }) => convertVideoArcToJw(element),
    gallery: ({ cachedCall, element, arcSite }) =>
        addGalleryData(cachedCall, element, arcSite)
};

export const configCallbackContentElements = {
    gallery: ({ cachedCall, element, arcSite } = {}) => {
        return addGalleryData(cachedCall, element, arcSite);
    },
    text: ({ element = {}, withSponsoredLink } = {}) => {
        const newElement = formatElementText(element);
        const content = compose(
            replaceClassForMark,
            setOtherChar,
            setExternalLinks,
            setItalicText,
            setBoldText
        )({ content: get(newElement, 'content', ''), withSponsoredLink });

        return {
            ...newElement,
            content
        };
    },
    interstitial_link: ({ element = {} } = {}) => {
        const interstitialLink = get(element, 'url', '');
        const validUrl = formatInterstitialLink(interstitialLink);

        return url && { ...element, url: validUrl };
    },
    custom_embed: ({ element }) =>
        get(element, 'subtype', '') !== 'custom-parallax' && element,
    video: ({ element, arcSite } = {}) => {
        return convertVideoArcToJw(element, arcSite);
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
