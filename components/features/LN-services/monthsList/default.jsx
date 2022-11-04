import React from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import Text from '../../../private/common/text';
import ComLink from '../../../private/common/com-link';
import get from '../../../private/common/utils/get';
import { monthNames } from '../../../private/common/utils/dateAndTimeUtil';
import '../../../../resources/dist/css/ln/components/service-list.css';

const MonthsList = ({ id: _featureId }) => {
    const serviceItem = get(useAppContext(), 'globalContent.serviceItem', '');
    return (
        <div className="service-list --font-bold">
            {monthNames &&
                monthNames.map(month => (
                    <div className="service-item" key={month}>
                        <Text tag="h2" size="2xs">
                            <ComLink
                                link={`/feriados/${serviceItem}/${month}/`}
                                title={`Ir a feriados de ${month} del ${serviceItem}`}
                            >
                                {month}
                            </ComLink>
                        </Text>
                    </div>
                ))}
        </div>
    );
};

MonthsList.label = 'LN Lista meses';
MonthsList.lazy = true;

MonthsList.propTypes = {
    id: PropTypes.string.isRequired
};

export default MonthsList;
