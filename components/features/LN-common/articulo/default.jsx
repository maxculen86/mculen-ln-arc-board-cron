/* eslint-disable react/require-default-props */
import React from 'react';
import { useAppContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import { validateArticleFeature } from '../../../private/LN/common/utils/cajaTemasValidators';
import { getCajaTemaConfig } from '../../../private/LN/home/components/noteCard/noteCardHelper';
import NoteCard from '../../../private/LN/home/components/noteCard/noteCard';
import PageBuilderMessage from '../../../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import filter from '../../../../content/filters/LN/nota/articleAcu';
import featureArticleCustomsFields from '../../../private/LN/common/utils/articuloHelper';

const ArticleFeature = ({
    id: featureId,
    customFields,
    searchableField,
    customFields: { noteId: id, imageId },
    isBomba = false
}) => {
    const { isAdmin, arcSite, renderables, outputType } = useAppContext();
    const { cajaTemaConfig } = getProperties(arcSite);
    const {
        config,
        index,
        boxPosition,
        layout,
        imageConfig
    } = getCajaTemaConfig(featureId, renderables, cajaTemaConfig, isBomba);

    const article = useContent({
        source: 'articleSourceNota',
        query: { id, published: true, imageConfig },
        filter
    });

    const image =
        imageId &&
        useContent({
            source: 'relatedImageSource',
            query: { id: imageId, published: true, imageConfig }
        });

    const error = validateArticleFeature(id, article);

    if (isAdmin && !!error) {
        return (
            <div
                style={{
                    marginTop: '10px',
                    marginBottom: '10px',
                    width: '100%'
                }}
            >
                <PageBuilderMessage
                    key={featureId}
                    type={error.type}
                    message={error.message}
                />
            </div>
        );
    }

    return (
        (!error && article && (
            <NoteCard
                id={featureId}
                article={article}
                promoItems={image && image.promo_items}
                articleProps={config}
                customFields={customFields}
                outputType={outputType}
                index={index}
                boxPosition={boxPosition}
                layout={layout}
                isAdmin={isAdmin}
            />
        )) || <></>
    );
};

ArticleFeature.label = 'LN Articulo';

ArticleFeature.propTypes = {
    id: PropTypes.string.isRequired,
    tree: PropTypes.shape({
        children: PropTypes.array
    }).isRequired,
    customFields: PropTypes.shape({
        ...(featureArticleCustomsFields('articuloGeneral') || {})
    }),
    searchableField: PropTypes.shape({
        imageId: PropTypes.string
    })
};

export default ArticleFeature;
