import React from 'react';
import { useAppContext } from 'fusion:context';
import { Text } from '@ln/contenidos-ui-text';
import ComDate from './com-date';
import ComHour from './com-hour';
import ReadingTime from '../../features/LN-10-global/common/readingTime/default';
import {
    getFormattedStringDate,
    getUpdateDateMoreYears
} from './utils/dateAndTimeUtil';
import { getClassNameByLayout } from './utils/modDateHelper';

function ModDate({
    display_date: displayDate = '',
    labelEdicionImpresa = {},
    first_publish_date: firstPublishDate = '',
    last_updated_date: lastUpdatedDate = ''
}) {
    const lastUpdatedResult = getUpdateDateMoreYears(
        firstPublishDate,
        lastUpdatedDate
    );
    const dateFormattedUpdate = getFormattedStringDate(lastUpdatedResult);
    const { layout } = useAppContext() || {};
    const containerClasses = getClassNameByLayout({ layout });

    return (
        <div className={containerClasses}>
            <ul className="mod-date flex jc-start ai-center --bullet-list_12 w-100">
                <li className="flex ai-center">
                    <ComDate display_date={displayDate} />
                </li>
                <li className="mod-date-hour flex ai-center">
                    <ComHour
                        display_date={displayDate}
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
}

export default ModDate;
