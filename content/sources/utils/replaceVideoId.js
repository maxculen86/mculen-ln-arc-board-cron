import { isValidString } from '../../../components/private/common/utils/dataValidation';

export const replaceVideoId = (url = '', newId = '') => {
    if (!url || !isValidString(url)) return url;

    return url.replace(/vid(\w{7,8})/, `jwid${newId}`);
};
