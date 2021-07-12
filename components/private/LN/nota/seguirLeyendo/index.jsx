import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../../../resources/dist/css/ln/modules/mod-keepreading.css';
// import ComTitle from '../../../common/com-title';
import ComLink from '../../../common/com-link';
import ComTitle from '../../../common/com-title';

const getContent = element => {
    if (!element.headlines) return '';

    const span =
        element.label && element.label.volanta
            ? `<span class="hlp-bold">${element.label.volanta.text}</span>&nbsp;`
            : '';

    const content = element.headlines.mobile
        ? `${span} ${element.headlines.mobile}`
        : element.headlines.basic;

    return content;
};

const Index = ({ relatedContent = [] }) => {
    return (
        <ul className="mod-keepreading">
            {relatedContent.map((element, index) => {
                if (!element) return null;
                const content = getContent(element);
                const { _id: elementId } = element;

                return (
                    <li
                        data-pos={`toi${index + 1}`}
                        data-id={elementId}
                        data-notaid={elementId}
                    >
                        {/* <ComTitle
                            tag="h2"
                            content={content}
                            link={element.website_url || element.canonical_url}
                            size="--threexs"
                        >
                            {element.headlines ? element.headlines.basic : ''}
                        </ComTitle> */}

                        <ComTitle
                            link={element.website_url || element.canonical_url}
                            size="--twoxs"
                            tag="h3"
                            content={content}
                        />
                    </li>
                );
            })}
        </ul>
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
