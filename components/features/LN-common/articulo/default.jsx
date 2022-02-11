/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/require-default-props */
import React from 'react';
import { useAppContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import { validateArticleFeature } from '../../../private/LN/common/utils/cajaTemasValidators';
import {
    getCajaTemaConfig,
    isInHomeAperturaOrBomba
} from '../../../private/LN/home/components/noteCard/noteCardHelper';
import NoteCard from '../../../private/LN/home/components/noteCard/noteCard';
import PageBuilderMessage from '../../../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import filter from '../../../../content/filters/LN/nota/articleAcu';
import featureArticleCustomsFields from '../../../private/LN/common/utils/articuloHelper';
import siteConfig from '../../../../properties/sites/la-nacion-ar';
import { getPlaceholder } from '../../../private/LN/common/utils/cajaTemasPlaceholder';
import { productClickFromClient } from '../../../private/common/utils/viewability';

const ArticleFeature = ({
    id: featureId,
    customFields,
    searchableField,
    customFields: { noteId: id, imageId, video: videoId },
    isBomba = false
}) => {
    const {
        isAdmin,
        arcSite,
        renderables,
        outputType,
        layout: layoutPageBuilder
    } = useAppContext();
    const { cajaTemaConfig } = getProperties(arcSite);
    const {
        config,
        index,
        boxPosition,
        layout,
        imageConfig
    } = getCajaTemaConfig(featureId, renderables, cajaTemaConfig, isBomba);

    const article =
        id &&
        useContent({
            source: 'articleSourceNota',
            query: { id: id.trim(), published: true, imageConfig },
            filter
        });

    const videoBackground =
        videoId &&
        useContent({
            source: 'videoSource',
            query: { id: videoId.trim(), website: 'la-nacion-ar' }
        });

    const image =
        imageId &&
        imageId.trim() &&
        useContent({
            source: 'relatedImageSource',
            query: {
                id: imageId.trim(),
                published: true,
                imageConfig,
                nid: id,
                boxType: 'ArticleFeature'
            }
        });

    const error = validateArticleFeature(id, article);

    const { layoutsName = {} } = siteConfig || {};

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
                isInHomeAperturaOrBomba={isInHomeAperturaOrBomba(
                    renderables,
                    featureId,
                    layoutsName,
                    layoutPageBuilder
                )}
                videoBackground={videoBackground}
                isPowa={layout !== 'grilla1'}
                handleClick={productClickFromClient}
            />
        )) ||
        getPlaceholder(layout, index)
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
