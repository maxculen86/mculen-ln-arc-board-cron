import get from '../../../../../private/common/utils/get';

export const getTitleData = (headlines = {}) => {
    const titleBasic = get(headlines, 'basic', '');
    const titleNative = get(headlines, 'native', '');

    return {
        title1: titleNative || titleBasic,
        title2: titleNative ? titleBasic : ''
    };
};
