import get from '../../../../../../common/utils/get';
import { dateAndTimeForAppsUtil } from '../../../../../../common/utils/dateAndTimeUtil';

export const getLastPublishDate = article => {
    let date = get(article, 'publish_date', null);
    date = date ? dateAndTimeForAppsUtil(date) : null;
    return date;
};
export default getLastPublishDate;
