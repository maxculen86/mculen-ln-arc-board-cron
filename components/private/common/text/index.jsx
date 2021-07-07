import React from 'react';
import PropTypes from 'prop-types';
import { getFontFamily, getFontSize, getFontWeight } from './getFontData';

const Text = ({
    id,
    tag,
    extraClass,
    font,
    size,
    weight,
    children,
    text,
    link,
    styles
}) => {
    const CustomTag = tag;
    const _content = children || text;

    const _font = getFontFamily(font);
    const _size = getFontSize(size);
    const _weight = getFontWeight(weight);

    const _className = `${extraClass ? ` ${extraClass}` : ''}${
        font ? ` ${_font}` : ''
    }${size ? ` ${_size}` : ''}${weight ? ` ${_weight}` : ''}`;

    if (!_content) return null;

    return (
        <CustomTag id={id} className={_className} style={styles}>
            {link ? (
                <a
                    href={link}
                    //aria-label={_content}
                    //className="link"
                    title={_content}
                    dangerouslySetInnerHTML={{ __html: _content }}
                />
            ) : (
                _content
            )}
        </CustomTag>
    );
};

Text.propTypes = {
    children: PropTypes.node,
    id: PropTypes.string,
    tag: PropTypes.string,
    text: PropTypes.string,
    link: PropTypes.string,
    extraClass: PropTypes.string,
    styles: PropTypes.string,
    font: PropTypes.string,
    size: PropTypes.string,
    weight: PropTypes.string
};

Text.defaultProps = {
    children: '',
    id: undefined,
    tag: 'span',
    text: '',
    link: '',
    extraClass: 'com-text',
    styles: undefined,
    font: '',
    size: '',
    weight: ''
};

export default Text;
