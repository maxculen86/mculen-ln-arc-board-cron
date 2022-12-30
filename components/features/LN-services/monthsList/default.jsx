import React from 'react';
import { useAppContext } from 'fusion:context';
import Text from '../../../private/common/text';
import ComLink from '../../../private/common/com-link';
import get from '../../../private/common/utils/get';
import { monthNames } from '../../../private/common/utils/dateAndTimeUtil';
import '../../../../resources/dist/css/ln/components/service-list.css';
import StaticContent from '../../../private/common/staticContent';

const MonthsList = () => {
    const serviceItem = get(useAppContext(), 'globalContent.serviceItem', '');
    return (
        <StaticContent>
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
        </StaticContent>
    );
};

MonthsList.label = 'LN Lista meses';

export default MonthsList;
