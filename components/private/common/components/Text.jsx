import React from 'react';
import PropTypes from 'fusion:prop-types';
import { getFontFamily, getFontSize, getFontWeight } from './data/GetFontData';

const propTypes = {
    children: PropTypes.element.isRequired,
    tag: PropTypes.string,
    extraClass: PropTypes.string,
    font: PropTypes.string,
    sizeFont: PropTypes.string,
    weight: PropTypes.string,
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
    text
}) => {
    const _font = getFontFamily(font);
    const _size = getFontSize(size);
    const _weight = getFontWeight(weight);

    const CustomTag = tag;

    const className = `text${extraClass ? ` ${extraClass}` : ''}${
        font ? ` ${_font}` : ''
    }${size ? ` ${_size}` : ''}${weight ? ` ${_weight}` : ''}${
        bold ? ` --font-bold` : ''
    }${highlight ? ` --font-highlight` : ''}${capital ? ` --capital` : ''}`;
    const content = children || text;

    if (!children) return null;

    return <CustomTag className={className}>{content}</CustomTag>;
};

Text.propTypes = PropTypes;

export default Text;
