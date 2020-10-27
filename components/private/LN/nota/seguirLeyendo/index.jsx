import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../../../resources/dist/css/ln/modules/mod-keepreading.css';
import ComTitle from '../../../common/com-title';

const getContent = element => {
    const span =
        element.label && element.label.volanta
            ? `<span class="hlp-bold">${element.label.volanta.text}</span>&nbsp;`
            : '';

    const content = `${span} ${
        element.headlines ? element.headlines.basic : ''
    }`;

    return content;
};

const Index = ({ relatedContent = [] }) => {
    return (
        <div className="mod-keepreading">
            {relatedContent.map((element, index) => {
                if (!element) return null;
                const content = getContent(element);
                return (
                    <article data-pos={`toi${index + 1}`} data-id="1">
                        <ComTitle
                            tag="h2"
                            content={content}
                            link={element.website_url || element.canonical_url}
                            size="--threexs"
                        >
                            {element.headlines ? element.headlines.basic : ''}
                        </ComTitle>
                    </article>
                );
            })}
        </div>
    );
};

Index.propTypes = {
    relatedContent: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            headlines: PropTypes.shape({
                basic: PropTypes.string
            }),
            type: PropTypes.string.isRequired,
            website_url: PropTypes.string,
            canonical_url: PropTypes.string
        })
    ).isRequired
};

export default Index;
