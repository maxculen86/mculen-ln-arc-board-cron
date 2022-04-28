import { formatDateWithoutAddingHours } from '../utils/dateAndTimeUtil';

const setMetasOtt = ({ date, acumulado, title, section, siteProperties }) => {
    const options = {
        video: () => {
            const stringToDate = new Date(date);
            const formattedDate = formatDateWithoutAddingHours({
                date: stringToDate,
                capitalize: true
            });

            return {
                title: `${title} programa emitido el ${formattedDate} - LN+`,
                description: `Ingresá en LN+ para ver ${title} programa emitido el ${formattedDate}. Los mejores programas están en LN+`
            };
        },

        acumulado: () => {
            return {
                title: `${acumulado} - ${siteProperties.acumuladoTitle}`,
                description: `Ingresá a LN+ para ver ${acumulado} en vivo y emisiones pasadas.`
            };
        },

        default: () => {
            return {
                title: siteProperties.title,
                description: siteProperties.description
            };
        }
    };

    return options[section] ? options[section]() : options.default();
};

export default setMetasOtt;
