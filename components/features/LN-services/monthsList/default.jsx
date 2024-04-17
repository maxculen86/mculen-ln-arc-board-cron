import React from 'react';
import { useAppContext } from 'fusion:context';
import Static from 'fusion:static';
import Text from '../../../private/common/text';
import ComLink from '../../../private/common/com-link';
import get from '../../../private/common/utils/get';
import { monthNames } from '../../../private/common/utils/dateAndTimeUtil';
import '../../../../resources/dist/css/ln/components/service-list.css';

const MonthsList = () => {
    const serviceItem = get(useAppContext(), 'globalContent.serviceItem', '');
    const id = get(useAppContext(), 'globalContent._id', '');
    return (
        <Static id={`months-list${id}`} htmlOnly>
            <div className="service-list --font-bold">
                {monthNames &&
                    monthNames.map(month => (
                        <div className="service-item" key={month}>
                            <Text tag="h2" size="2xs">
                                <ComLink
                                    link={`/feriados/${serviceItem}/${month}/`}
                                    title={`Ir a feriados de ${month.toLowerCase()} del ${serviceItem}`}
                                >
                                    {month}
                                </ComLink>
                            </Text>
                        </div>
                    ))}
            </div>
        </Static>
    );
};

MonthsList.label = 'LN Lista meses';

export default MonthsList;
