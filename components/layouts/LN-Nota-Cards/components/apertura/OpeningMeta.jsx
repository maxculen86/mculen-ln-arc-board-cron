import React from 'react';
import PropTypes from 'prop-types';
import dateAndTimeUtil, {
    addHoursAndFormat
} from '../../../../private/common/utils/dateAndTimeUtil';

function OpeningMeta({ children, data }) {
    const { publishDate } = data || {};

    const { date } = dateAndTimeUtil(publishDate);
    const { time } = dateAndTimeUtil(addHoursAndFormat(3, publishDate));

    return (
        <div className="flex flex-column ai-center" id="openingMeta">
            <ul className="com-date flex jc-start ai-center --bullet-list_12 pb-0">
                {[date, time].map(item => (
                    <li
                        key={item}
                        className="flex ai-center text-neutral-light-600"
                    >
                        <time>{item}</time>
                    </li>
                ))}
            </ul>
            {children}
        </div>
    );
}

OpeningMeta.propTypes = {
    data: PropTypes.shape({
        publishDate: PropTypes.string,
        authors: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string
            })
        ),
        label: PropTypes.shape({
            basic: PropTypes.shape({
                text: PropTypes.string
            })
        })
    }),
    children: PropTypes.node.isRequired
};

OpeningMeta.defaultProps = {
    data: {}
};

export default OpeningMeta;
