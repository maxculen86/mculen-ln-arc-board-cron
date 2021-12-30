import React from 'react';
import PropTypes from 'prop-types';
import ReactDOMServer from 'react-dom/server';
import config from '../../../../../properties/sites/la-nacion-ar';
import ComLink from '../../../common/com-link';
import ComParagraph from '../../../common/com-paragraph';
import { compose } from '../../../common/utils/functional';

const Parrafo = ({ data, capital, size, classCondition }) => {
    const content =
        data.content &&
        compose(
            replaceClassForMark,
            setOtherChar,
            setExternalLinks,
            setItalicText,
            setBoldText
        )(data.content);

    // Si el redactor hace enter varias veces ignoramos los <br/>
    if (content === '<br/>') return <></>;

    return (
        <ComParagraph
            capital={capital && isLetter(content) ? `--capital` : ''}
            classCondition={classCondition}
            size={size}
            content={content}
        />
    );
};

Parrafo.arcType = 'text';
Parrafo.isStatic = true;

Parrafo.propTypes = {
    data: PropTypes.shape({
        content: PropTypes.string.isRequired,
        type: PropTypes.string
    }),
    capital: PropTypes.bool,
    size: PropTypes.string,
    classCondition: PropTypes.string
};

Parrafo.defaultProps = {
    capital: false,
    size: '--s',
    classCondition: '',
    data: PropTypes.shape({
        type: ''
    })
};

export default Parrafo;

const isLetter = text => text.match(/^[A-Za-z]/);

const setOtherChar = text => text.replace(/&lt;/g, '<').replace(/&gt;/g, '>');

const replaceClassForMark = text =>
    text
        .replace(/hl_yellow/g, 'hl_underline')
        .replace(/hl_pink/g, 'hl_underline')
        .replace(/hl_purple/g, 'hl_underline')
        .replace(/hl_orange/g, 'hl_underline')
        .replace(/hl_green/g, 'hl_underline');

const setBoldText = text =>
    text.replace(/<b>/g, '<strong>').replace(/<\/b>/g, '</strong>');

const setItalicText = text =>
    text.replace(/<i>/g, '<em>').replace(/<\/i>/g, '</em>');

const deleteTagsForTitle = text =>
    text
        .replace(/<em>/g, '')
        .replace(/<\/em>/g, '')
        .replace(/<strong>/g, '')
        .replace(/<\/strong>/g, '');

const setExternalLinks = text =>
    text.replace(
        /<a[\s]+([^>]+)>((?:.(?!\<\/a\>))*.)<\/a>/g,
        (href, string) => {
            const [, , link] = href.match(/href=(["'\\])+(.*?)\1/) || [
                null,
                null,
                '#'
            ];
            let target = '_self';

            if (!href.includes(config.host)) {
                target = '_blank';
            }

            return ReactDOMServer.renderToString(
                React.createElement(
                    ComLink,
                    {
                        link,
                        target,
                        title: deleteTagsForTitle(string)
                    },
                    string
                )
            );
        }
    );
