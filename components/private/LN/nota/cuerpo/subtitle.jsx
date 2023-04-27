import React from 'react';
import PropTypes from 'prop-types';
import ComTitle from '../../../common/com-title';

const Subtitle = ({ data }) => {
    const fontExtra = '--font-extra';
    const tagConfigByLevel = {
        1: {
            tag: 'h2',
            size: '--xl',
            weight: fontExtra
        },
        2: {
            tag: 'h3',
            size: '--l',
            weight: fontExtra
        },
        3: { tag: 'h4', size: '--twoxs', font: '--arial' },
        4: { tag: 'h4', size: '--twoxs', font: '--arial' },
        5: { tag: 'h4', size: '--twoxs', font: '--arial' },
        6: { tag: 'h4', size: '--twoxs', font: '--arial' },
        default: {
            tag: 'h2',
            size: '--xl',
            weight: fontExtra
        }
    };
    const { level, content } = data;
    const _props = tagConfigByLevel[level] || tagConfigByLevel.default;
    return (
        <ComTitle
            tag={_props.tag}
            size={_props.size}
            classCondition={_props.classCondition}
            content={content}
            weight={_props.weight}
            font={_props.font}
        />
    );
};

Subtitle.arcType = 'header';
Subtitle.isStatic = true;

Subtitle.propTypes = {
    data: PropTypes.shape({
        content: PropTypes.string.isRequired,
        level: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired
    }).isRequired
};

export default Subtitle;
