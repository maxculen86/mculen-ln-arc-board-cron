import { isHomeLN10 } from '../../../../../private/common/utils/image/getDataToLinkImage/_helper/common/helper-WebApi';

const getPageType = (layout = '', section = '') => {
    if (isHomeLN10(layout)) return 'home';
    if (layout === 'LN-acumulado') return 'acumulado';
    if (section === '/deportes') return 'Deportes';

    return 'nota';
};

export default getPageType;
