/* eslint-disable react/require-default-props */
import React, { useState, useContext } from 'react';
import { useAppContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import { validateArticleFeature } from '../../../private/LN/common/utils/cajaTemasValidators';
import { getChildrenFromAperturaHome } from '../../../private/LN/common/utils/cajaTemasHelper';
import { getCajaTemaConfig } from '../../../private/LN/home/components/noteCard/noteCardHelper';
import NoteCard from '../../../private/LN/home/components/noteCard/noteCard';
import PageBuilderMessage from '../../../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import filter from '../../../../content/filters/LN/nota/articleAcu';
import { GlobalContext } from '../../../private/common/context/globalContext';
import get from '../../../private/common/utils/get';
import featureArticleCustomsFields from '../../../private/LN/common/utils/articuloHelper';

const notesLoaded = [];

const ArticleFeature = ({
    id: featureId,
    customFields,
    searchableField,
    imageConfig,
    customConfig,
    customFields: { noteId: id, imageId },
    isBomba = false
}) => {
    // Este componente tiene uso en home
    // por regla de negocio se va a evaluar los articulo de apertura

    const { isAdmin, arcSite, renderables, outputType } = useAppContext();
    const { cajaTemaConfig } = getProperties(arcSite);
    const { config, index, boxPosition, layout } =
        customConfig ||
        getCajaTemaConfig(featureId, renderables, cajaTemaConfig);
    const [toInstance, setToInstance] = useState(() => false);

    const { dispatch } = useContext(GlobalContext);

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

    const aperturasChildren = getChildrenFromAperturaHome(renderables);

    const isInApertura = aperturasChildren.some(el => {
        return (
            !get(el, 'props.customFields.hideCaja', false) &&
            get(el, 'children', []).some(child => child.props.id === featureId)
        );
    });

    if (
        article &&
        Object.keys(article).length &&
        isInApertura &&
        !toInstance &&
        !notesLoaded.includes(article._id)
    ) {
        notesLoaded.push(article._id);
        setToInstance(() => true);
        dispatch({ type: 'ADD_TAGS_ARTICLES', article });
    }

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
                boxPosition={isBomba ? '00' : boxPosition}
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
