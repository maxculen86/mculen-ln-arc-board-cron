import React from 'react';
import PropTypes from 'prop-types';
import { getFontFamily, getFontSize, getFontWeight } from './getFontData';

const Text = ({
    tag,
    id,
    extraClass,
    children,
    text,
    link,
    font,
    size,
    weight,
    styles
}) => {
    const CustomTag = tag;
    const _content = children || text;

    const _font = getFontFamily(font);
    const _size = getFontSize(size);
    const _weight = getFontWeight(weight);

    const setTextClassName = props =>
        Object.values(props)
            .filter(Boolean)
            .join(' ');

    const _className = setTextClassName({ extraClass, _font, _weight, _size });

    if (!_content) return null;

    return (
        <CustomTag id={id} className={_className} style={styles}>
            {link ? (
                <a href={link} title={_content}>
                    {_content}
                </a>
            ) : (
                _content
            )}
        </CustomTag>
    );
};

Text.propTypes = {
    tag: PropTypes.string,
    id: PropTypes.string,
    extraClass: PropTypes.string,
    children: PropTypes.node,
    text: PropTypes.string,
    link: PropTypes.string,
    font: PropTypes.string,
    size: PropTypes.string,
    weight: PropTypes.string,
    styles: PropTypes.string
};

Text.defaultProps = {
    tag: 'span',
    id: undefined,
    extraClass: 'com-text',
    children: '',
    text: '',
    link: '',
    font: '',
    size: '',
    weight: '',
    styles: undefined
};

export default Text;
