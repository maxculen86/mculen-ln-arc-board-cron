import React from 'react';
import PropTypes from 'prop-types';
import ReactDOMServer from 'react-dom/server';
import config from '../../../../../properties/sites/la-nacion-ar';
import ComLink from '../../../common/com-link';
import ComParagraph from '../../../common/com-paragraph';
import { compose } from '../../../common/utils/functional';
import { appendPageReferrerParam } from '../../common/utils/pageReferrer';

const isLetter = (text = '') => text.match(/^[A-Za-z]/);

const setOtherChar = (text = '') =>
    text.replace(/&lt;/g, '<').replace(/&gt;/g, '>');

const replaceClassForMark = (text = '') =>
    text.replace(/hl_(yellow|pink|purple|orange|green|gold)/g, 'hl_underline');

const setBoldText = ({ content = '', withSponsoredLink } = {}) => ({
    text: content.replace(/(?:<|<(\/))b(?:>)/g, '<$1strong>'),
    withSponsoredLink
});

const setItalicText = ({ text = '', withSponsoredLink } = {}) => ({
    content: text.replace(/(?:<|<(\/))i(?:>)/g, '<$1em>'),
    withSponsoredLink
});

const deleteTagsForTitle = (text = '') =>
    text.replace(/(<|<\/)(em|strong)>/g, '');

const setExternalLinks = ({ content = '', withSponsoredLink } = {}) =>
    content.replace(
        /<a[\s]+([^>]+)>((?:.(?!<\/a>))*.)<\/a>/g,
        (_, href, string) => {
            const [, , link] = href.match(/href=(["'\\])([^"'\\]*)\1/) || [
                null,
                null,
                '#'
            ];
            const [, , title] = href.match(/title=(["'\\])+(.*?)\1/) || [
                null,
                null,
                string
            ];

            const referredLink = appendPageReferrerParam(link);

            return ReactDOMServer.renderToString(
                React.createElement(
                    ComLink,
                    {
                        link: referredLink || link,
                        target: !href.includes(config.host)
                            ? '_blank'
                            : '_self',
                        title: deleteTagsForTitle(title),
                        withSponsoredLink,
                        marfeelTrack: true,
                        classCondition: 'break-word'
                    },
                    string
                )
            );
        }
    );

function Parrafo(props) {
    const { data, capital, size, classCondition, withSponsoredLink } = props;

    const content = compose(
        replaceClassForMark,
        setOtherChar,
        setExternalLinks,
        setItalicText,
        setBoldText
    )({ content: data.content, withSponsoredLink });

    // eslint-disable-next-line react/jsx-no-useless-fragment
    if (content === '<br/>') return <></>;

    return (
        <ComParagraph
            capital={capital && isLetter(content) ? `--capital` : ''}
            classCondition={classCondition}
            size={size}
            content={content}
        />
    );
}

Parrafo.arcType = 'text';
Parrafo.isStatic = true;

Parrafo.propTypes = {
    data: PropTypes.shape({
        content: PropTypes.string.isRequired,
        type: PropTypes.string
    }),
    capital: PropTypes.bool,
    size: PropTypes.string,
    classCondition: PropTypes.string,
    withSponsoredLink: PropTypes.bool
};

Parrafo.defaultProps = {
    capital: false,
    size: '--s',
    classCondition: '',
    data: PropTypes.shape({
        type: ''
    }),
    withSponsoredLink: false
};

export default Parrafo;
