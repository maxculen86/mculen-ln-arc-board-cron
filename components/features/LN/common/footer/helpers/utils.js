import { SITE_LANACION, SITIO_SEGURO_REGISTRACION } from 'fusion:environment';
import {
    datesDiffInDays,
    getArgentinaDateMonthYear,
    getArgentinaYear
} from '../../../../../private/common/utils/dateAndTimeUtil';

const BASE_URL_BY_TYPE = {
    SITE_LANACION,
    SITIO_SEGURO_REGISTRACION
};

export const resolveFooterHref = ({ href, type }) => {
    if (!type) return href;

    const baseUrl = BASE_URL_BY_TYPE[type];

    return baseUrl ? `${baseUrl}${href}` : href;
};

export const getEditionDetails = () => {
    const refDate = new Date('1995-12-13T03:00:00');
    const currentDate = new Date();

    return {
        edNumber: datesDiffInDays(refDate, currentDate),
        edDate: {
            date: getArgentinaDateMonthYear(),
            year: getArgentinaYear()
        }
    };
};
