import React from 'react';
import setClassName from '../utils/setClassName';
import { getFontFamily, getFontSize, getFontWeight } from './getFontData';
import '../../../../resources/dist/css/ln/components/com-text.css';

function Text({
    tag = 'span',
    id,
    extraClass = 'com-text',
    children = '',
    text = '',
    link = '',
    font = '',
    size = '',
    weight = '',
    styles
}) {
    const CustomTag = tag;
    const _content = children || text;

    const _font = getFontFamily(font);
    const _size = getFontSize(size);
    const _weight = getFontWeight(weight);

    const _className = setClassName({ extraClass, _font, _weight, _size });

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
}

export default Text;
