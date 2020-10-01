import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../resources/dist/css/ln/modules/mod-article.css';
import Media from '../LN/common/media';
import get from './utils/get';
import ModDescription from './mod-description';

const ModArticle = props => {
    const {
        articleData,
        dataSection,
        outputType,
        classCondition,
        link,
        titleTag,
        titleSize,
        titleText,
        marqueeSize,
        authors,
        withMedia,
        subheadText,
        subheadSize,
        dateText,
        dateSize,
        hour
    } = props;

    const extraOpts = {};
    if (dataSection) {
        extraOpts['data-section'] = dataSection;
        extraOpts['data-event'] = 'LinkClick';
    }
    const imagenDestacada = get(articleData, 'promo_items.basic', null);
    const type = get(imagenDestacada, 'type', null);

    return (
        <article
            className={`mod-article ${classCondition || ''}`}
            {...extraOpts}
        >
            {hour && hour}

            {withMedia && (
                <Media
                    mediaData={type === 'image' ? imagenDestacada : null}
                    href={link}
                    outputType={outputType}
                />
            )}

            <ModDescription
                link={link}
                titleTag={titleTag}
                titleSize={titleSize}
                titleText={titleText}
                authors={authors}
                subheadText={subheadText}
                subheadSize={subheadSize}
                dateText={dateText}
                dateSize={dateSize}
            />
        </article>
    );
};

ModArticle.propTypes = {
    dataSection: PropTypes.string,
    classCondition: PropTypes.string,
    link: PropTypes.string,
    titleTag: PropTypes.string,
    titleSize: PropTypes.string,
    titleText: PropTypes.string.isRequired,
    subheadText: PropTypes.string,
    subheadSize: PropTypes.string,
    dateText: PropTypes.string,
    dateSize: PropTypes.string,
    hour: PropTypes.oneOfType([PropTypes.string, PropTypes.boolean]),
    authors: PropTypes.string,
    withMedia: PropTypes.boolean,
    outputType: PropTypes.string,
    articleData: PropTypes.shape({
        promo_items: PropTypes.shape({
            basic: PropTypes.object
        })
    }).isRequired
};

ModArticle.defaultProps = {
    dataSection: undefined,
    classCondition: undefined,
    titleTag: 'h4',
    titleSize: '--s',
    subheadText: false,
    subheadSize: '',
    dateText: undefined,
    dateSize: undefined,
    authors: '',
    withMedia: false,
    link: undefined,
    hour: undefined,
    outputType: 'default'
};

export default ModArticle;
