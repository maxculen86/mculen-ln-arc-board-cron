import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../resources/dist/css/ln/modules/mod-article.css';
import Media from '../LN/common/media';
import get from './utils/get';
import ModDescription from './mod-description';
//para demo front
import ComImage from './com-image';
import ModMedia from './mod-media';
import getAuthorsPhoto from './utils/getAuthorsPhoto';

const ModArticle = props => {
    const {
        frontdemo,
        srcdemo,
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
        authorSize,
        isRenderAuthor,
        withMedia,
        subheadText,
        subheadSize,
        dateText,
        dateSize,
        leadText,
        anexo,
        noMedia,
        label,
        pos,
        hour
    } = props;
    const extraOpts = {};
    if (dataSection) {
        extraOpts['data-section'] = dataSection;
        extraOpts['data-event'] = 'LinkClick';
    }
    const imagenDestacada = isRenderAuthor
        ? getAuthorsPhoto(articleData)
        : get(articleData, 'promo_items.basic', null);
    const marquesina = get(articleData, 'marquesina', null);
    const type = get(imagenDestacada, 'type', null);

    const idArc = `nid5E23BMUH${pos}XZ3LSXEK3BKOOA`;
    const classDemo = `toi${pos} ${idArc}`;

    const extraDemo = {};
    if (frontdemo) {
        extraDemo['data-pos'] = pos;
        extraOpts['data-id'] = idArc;
        extraOpts['data-notaid'] = idArc;
        extraOpts['data-source'] = `editor`;
    }

    return (
        <article
            className={`mod-article ${classCondition || ''} ${
                frontdemo ? classDemo : ''
            } ${noMedia ? '--no-media' : ''} ${
                isRenderAuthor ? '--author' : ''
            }`}
            {...extraOpts}
            {...extraDemo}
        >
            {hour && hour}

            {withMedia && (
                <Media
                    mediaData={type === 'image' ? imagenDestacada : null}
                    href={link}
                    outputType={outputType}
                    // labelArticle="La Chapita solo se tiene que ver con foto o placeholder"
                />
            )}

            {frontdemo && (
                <div>
                    <ModMedia>
                        <figure className="mod-figure">
                            <a href={link}>
                                <picture className="mod-picture">
                                    <ComImage src={srcdemo} />
                                </picture>
                            </a>
                        </figure>
                    </ModMedia>
                </div>
            )}

            <ModDescription
                link={link}
                titleTag={titleTag}
                titleSize={noMedia || isRenderAuthor ? '--m' : titleSize}
                titleText={titleText}
                authors={authors}
                authorSize={isRenderAuthor ? '--twoxs' : authorSize}
                subheadText={subheadText}
                subheadSize={subheadSize}
                dateText={dateText}
                dateSize={dateSize}
                lead={leadText}
                label={label}
                marquesina={marquesina}
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
    titleSize: '--xs',
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
