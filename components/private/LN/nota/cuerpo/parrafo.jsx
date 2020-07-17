import React from 'react';
import PropTypes from 'fusion:prop-types';
import config from '../../../../../properties/sites/la-nacion-ar';

import { compose } from '../../../common/utils/functional';

// TODO: Las variantes de Tags de HTMLs, que nos aprecen dentro del string de content nos genera un conflicto si queremos hacer render interno a un replace de un caso, no nos deja remplazar los otros regex
const Parrafo = ({ data, capital }) => {
    const isLetter = text => text.match(/^[A-Za-z]/);

    const setBoldText = text =>
        text.replace(/<b>/g, '<strong>').replace(/<\/b>/g, '</strong>');

    const setItalicText = text =>
        text.replace(/<i>/g, '<em>').replace(/<\/i>/g, '</em>');

    const setExternalLinks = text =>
        text.replace(
            /<a[\s]+([^>]+)>((?:.(?!\<\/a\>))*.)<\/a>/g,
            (match, href, string) => {
                if (!href.includes(config.host)) {
                    return `<a class='com-link' ${href} target='_blank'>${string}</a>`;
                }
                return `<a class='com-link' ${href}>${string}</a>`;
            }
        );

    const content = compose(
        setItalicText,
        setBoldText,
        setExternalLinks
    )(data.content);

    return (
        <>
            {content !== '<br/>' && ( // Si el redactor hace enter varias veces ignoramos los <br/>
                <p
                    className={`text element-paragraph${
                        capital && isLetter(content) ? ` capital` : ''
                    }`}
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                        __html: content
                    }}
                />
            )}
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
