import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import ComDate from './com-date';
import ComHour from './com-hour';
import ReadingTime from '../../features/LN-10-global/common/readingTime/default';
import { Text } from '@ln/contenidos-ui-text';
import {
    getFormattedStringDate,
    getUpdateDateMoreYears
} from './utils/dateAndTimeUtil';
import { getClassNameByLayout } from './utils/modDateHelper';

const ModDate = ({
    display_date = '',
    labelEdicionImpresa = {},
    first_publish_date = '',
    last_updated_date = ''
}) => {
    const last_updated_result = getUpdateDateMoreYears(
        first_publish_date,
        last_updated_date
    );
    const dateFormattedUpdate = getFormattedStringDate(last_updated_result);
    const { layout } = useAppContext() || {};
    const containerClasses = getClassNameByLayout({ layout });

    return (
        <div className={containerClasses}>
            <ul className="mod-date flex jc-start ai-center --bullet-list_12 w-100">
                <li className="flex ai-center">
                    <ComDate display_date={display_date} />
                </li>
                <li className="mod-date-hour flex ai-center">
                    <ComHour
                        display_date={display_date}
                        labelEdicionImpresa={labelEdicionImpresa}
                    />
                </li>
                <ReadingTime />
            </ul>
            {dateFormattedUpdate && (
                <Text
                    className="mod-last-update white-space-nowrap"
                    size="2xs"
                    weight="regular"
                >
                    Actualizado el {dateFormattedUpdate}
                </Text>
            )}
        </div>
    );
};

ModDate.propTypes = {
    display_date: PropTypes.string.isRequired,
    first_publish_date: PropTypes.string.isRequired,
    last_updated_date: PropTypes.string.isRequired,
    labelEdicionImpresa: PropTypes.string
};

export default ModDate;
