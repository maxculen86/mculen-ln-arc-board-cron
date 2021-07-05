import React from 'react';
import PropTypes from 'prop-types';
import { getFontFamily, getFontSize, getFontWeight } from './getFontData';

const Text = ({
    tag,
    extraClass,
    font,
    size,
    weight,
    bold,
    highlight,
    capital,
    children,
    text,
    color
}) => {
    const CustomTag = tag || 'span';
    const _content = children || text;

    const _font = getFontFamily(font);
    const _size = getFontSize(size);
    const _weight = getFontWeight(weight);

    const className = `com-text text${extraClass ? ` ${extraClass}` : ''}${
        font ? ` ${_font}` : ''
    }${size ? ` ${_size}` : ''}${weight ? ` ${_weight}` : ''}${
        bold ? ` --font-bold` : ''
    }${highlight ? ` --font-highlight` : ''}${capital ? ` --capital` : ''}`;
    const _color = { color: `${color}` };

    if (!children) return null;

    return (
        <CustomTag className={className} style={_color}>
            {_content}
        </CustomTag>
    );
};

Text.propTypes = {
    children: PropTypes.node,
    tag: PropTypes.string,
    text: PropTypes.string,
    extraClass: PropTypes.string,
    font: PropTypes.string,
    size: PropTypes.string,
    weight: PropTypes.string,
    color: PropTypes.string,
    bold: PropTypes.bool,
    highlight: PropTypes.bool,
    capital: PropTypes.bool
};

Text.defaultProps = {
    children: '',
    tag: '',
    text: '',
    extraClass: '',
    font: '',
    size: '',
    weight: '',
    color: '',
    bold: '',
    highlight: '',
    capital: ''
};

export default Text;
