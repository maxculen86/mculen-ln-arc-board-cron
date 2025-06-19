import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from '@ln/contenidos-ui-badge';
import { Text } from '@ln/contenidos-ui-text';
import StaticContentV2 from '../../../../chains/LN10-global/staticContentV2';

function OpeningDescription({ data }) {
    if (!data || !data.title) return null;

    const { signature, date, time, title, badge } = data;

    return (
        <div className="grid-col-1-7_md grid-col-1-6_md grid-col-1-8_lg grid-row-1_md">
            <div className="flex flex-column ai-center jc-center px-16 gap-16 h-100 ai-start_m px-0_m">
                {badge && <Badge text="en vivo" type="live" />}
                <div className="flex flex-column text-center prumo text-28 text-start_m text-40_md text-48_lg">
                    <Text font="prumo" as="h2">
                        {title}
                    </Text>
                </div>
                <div
                    style={{ margin: 0, padding: 0 }}
                    className="divider w-96"
                />
                <StaticContentV2 htmlOnly>
                    <ul className="com-date flex jc-start ai-center --bullet-list_12 w-100">
                        {[date, time].map(item => (
                            <li
                                key={item}
                                className="flex ai-center text-neutral-light-1"
                            >
                                <time>{item}</time>
                            </li>
                        ))}
                    </ul>
                </StaticContentV2>
                <div className="pb-16 h-70">{signature}</div>
            </div>
        </div>
    );
}

OpeningDescription.propTypes = {
    data: PropTypes.shape({
        volanta: PropTypes.string,
        title: PropTypes.string,
        date: PropTypes.string,
        time: PropTypes.string,
        badge: PropTypes.bool,
        signature: PropTypes.node
    })
};

OpeningDescription.defaultProps = {
    data: {}
};

export default OpeningDescription;
