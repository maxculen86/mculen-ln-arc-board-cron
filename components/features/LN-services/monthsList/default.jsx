import React from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import ModHeaderSection from '../../../private/common/mod-headerSection';
import Text from '../../../private/common/text';
import ComLink from '../../../private/common/com-link';
import get from '../../../private/common/utils/get';
import StaticValidation from '../../../private/common/staticValidation';
import { monthNames } from '../../../private/common/utils/dateAndTimeUtil';
import '../../../../resources/dist/css/ln/components/service-list.css';

const MonthsList = ({ id: _featureId }) => {
    const serviceItem = get(useAppContext(), 'globalContent.serviceItem', '');
    return (
        <StaticValidation id={_featureId} htmlOnly persistent>
            <ModHeaderSection
                tag="h2"
                title={`Todos los meses del ${serviceItem}`}
            />
            <div className="service-list --font-bold">
                {monthNames &&
                    monthNames.map(month => (
                        <div className="service-item" key={month}>
                            <Text tag="h3" size="2xs">
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
        </StaticValidation>
    );
};

MonthsList.label = 'LN Lista meses';

MonthsList.propTypes = {
    id: PropTypes.string.isRequired
};

export default MonthsList;
