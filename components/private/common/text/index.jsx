import React from 'react';
import PropTypes from 'prop-types';
import { getFontFamily, getFontSize, getFontWeight } from './getFontData';

const propTypes = {
    children: PropTypes.element.isRequired,
    tag: PropTypes.string,
    extraClass: PropTypes.string,
    font: PropTypes.string,
    size: PropTypes.string,
    weight: PropTypes.string,
    color: PropTypes.string,
    bold: PropTypes.bool,
    highlight: PropTypes.bool,
    capital: PropTypes.bool
};

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

    const className = `text${extraClass ? ` ${extraClass}` : ''}${
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

Text.propTypes = PropTypes;

export default Text;
