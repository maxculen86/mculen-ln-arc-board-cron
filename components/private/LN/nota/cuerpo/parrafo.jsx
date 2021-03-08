import React from 'react';
import PropTypes from 'fusion:prop-types';
import ReactDOMServer from 'react-dom/server';
import config from '../../../../../properties/sites/la-nacion-ar';
import ComLink from '../../../common/com-link';
import ComParagraph from '../../../common/com-paragraph';

import { compose } from '../../../common/utils/functional';

// TODO: cambiar parrafo por paragraph
const Parrafo = ({ data, capital, size, classCondition }) => {
    const isLetter = text => text && text.match(/^[A-Za-z]/);

    const setOtherChar = text =>
        text && text.replace(/&lt;/g, '<').replace(/&gt;/g, '>');

    const replaceClassForMark = text =>
        text &&
        text
            .replace(/hl_yellow/g, 'hl_underline')
            .replace(/hl_pink/g, 'hl_underline')
            .replace(/hl_purple/g, 'hl_underline')
            .replace(/hl_orange/g, 'hl_underline')
            .replace(/hl_green/g, 'hl_underline');

    const setBoldText = text =>
        text && text.replace(/<b>/g, '<strong>').replace(/<\/b>/g, '</strong>');

    const setItalicText = text =>
        text && text.replace(/<i>/g, '<em>').replace(/<\/i>/g, '</em>');

    const setExternalLinks = text =>
        text &&
        text.replace(
            /<a[\s]+([^>]+)>((?:.(?!\<\/a\>))*.)<\/a>/g,
            (match, href, string) => {
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
                            //classCondition: '--s',
                            title: string
                        },
                        string
                    )
                );
            }
        );

    const content = compose(
        replaceClassForMark,
        setOtherChar,
        setExternalLinks,
        setItalicText,
        setBoldText
    )(data.content);

    // Si el redactor hace enter varias veces ignoramos los <br/>
    if (content === '<br/>') return <></>;

    return (
        <>
            <ComParagraph
                capital={capital && isLetter(content) ? `--capital` : ''}
                classCondition={classCondition || ''}
                size={size || '--s'}
                content={content}
            />
        </>
    );
};

Parrafo.arcType = 'text';

Parrafo.propTypes = {
    data: PropTypes.shape({
        content: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
    }).isRequired,
    capital: PropTypes.bool
};

export default Parrafo;
