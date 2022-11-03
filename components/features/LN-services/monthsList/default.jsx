import React from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import ModHeaderSection from '../../../private/common/mod-headerSection';
import Text from '../../../private/common/text';
import ComLink from '../../../private/common/com-link';
import { monthNames } from '../../../private/common/utils/dateAndTimeUtil';
import get from '../../../private/common/utils/get';
import capitalizeFirstLetter from '../../../private/common/utils/capitalizeFirstLetter';

const MonthsList = ({ id: _featureId }) => {
    const serviceItem = get(useAppContext(), 'globalContent.serviceItem', '');

    return (
        <>
            <ModHeaderSection tag="h3" title="Meses" />
            <div className="province-list">
                {monthNames &&
                    monthNames.map(month => (
                        <div className="province" key={month}>
                            <Text tag="h2" size="--md" weight="bold">
                                <ComLink
                                    link={`/feriados/${serviceItem}/${month}/`}
                                    title={`Ver feriados de ${month}`}
                                >
                                    {capitalizeFirstLetter(month)}
                                </ComLink>
                            </Text>
                        </div>
                    ))}
            </div>
        </>
    );
};

MonthsList.static = true;
MonthsList.label = 'LN Lista meses';

MonthsList.propTypes = { id: PropTypes.string.isRequired };

export default MonthsList;
