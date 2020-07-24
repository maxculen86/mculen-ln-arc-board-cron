import React from 'react';
import PropTypes from 'fusion:prop-types';
import ReactDOMServer from 'react-dom/server';
import config from '../../../../../properties/sites/la-nacion-ar';
import ComLink from '../../../common/com-link';
import ComParagraph from '../../../common/com-paragraph';

import { compose } from '../../../common/utils/functional';

// TODO: cambiar parrafo por paragraph
const Parrafo = ({ data, capital }) => {
    const isLetter = text => text.match(/^[A-Za-z]/);

    const setOtherChar = text =>
        text.replace(/&lt;/g, '<').replace(/&gt;/g, '>');

    const setBoldText = text =>
        text.replace(/<b>/g, '<strong>').replace(/<\/b>/g, '</strong>');

    const setItalicText = text =>
        text.replace(/<i>/g, '<em>').replace(/<\/i>/g, '</em>');

    const setExternalLinks = text =>
        text.replace(
            /<a[\s]+([^>]+)>((?:.(?!\<\/a\>))*.)<\/a>/g,
            (match, href, string) => {
                const [, link] = href.match(/"(.*?[^\\])"/);
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
                            className: 'com-link',
                            title: string
                        },
                        string
                    )
                );
            }
        );

    const content = compose(
        setOtherChar,
        setExternalLinks,
        setItalicText,
        setBoldText
    )(data.content);
    // console.log(JSON.stringify(content))
    // Si el redactor hace enter varias veces ignoramos los <br/>
    if (content === '<br/>') return <></>;

    return (
        <>
            {/* <p
            className={`text element-paragraph${
                capital && isLetter(content) ? ` capital` : ''
            }`}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
                __html: content
            }}
        /> */}
            <ComParagraph
                capital={capital && isLetter(content) ? `--capital` : ''}
                size="--twoxs"
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
    capital: PropTypes.bool,
    outputType: PropTypes.string.isRequired
};

export default Parrafo;
