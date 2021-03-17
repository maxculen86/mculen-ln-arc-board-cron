import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import getArticleInCollection from '../../private/LN/common/utils/getArticleInCollection';
import CajaTema from '../../private/LN/common/cajaTema';
import {
    cajaTemasCustomsFields,
    validateFeature,
    getCommonProps,
    getIdsArticlesFromOtherCollections,
    isInApertura,
    getArticlesFromMyCurrentCollection
} from '../../private/LN/common/utils/cajaTemasHelper';
import PageBuilderMessage from '../../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
/*
const CajaCollection = props => {
    const {
        id: featureId,
        isAdmin,
        customFields: {
            idCollection,
            url,
            title,
            layout = '',
            backgroundColor,
            initialPosition,
            imageId,
            hideTitle,
            hideCaja
        },
        outputType,
        renderables,
        tree
    } = props;

    if (hideCaja) return <></>;

    const {
        collectionsInPage,
        notesQuantity,
        bgColor,
        classCondition
    } = getCommonProps(props);

    const articlesFromCollectionSiteService = getArticlesFromMyCurrentCollection(
        collectionsInPage,
        idCollection,
        Number(initialPosition) - 1,
        Number(notesQuantity)
    );

    const isInSiteService = articlesFromCollectionSiteService.length > 0;

    const idsArticlesToExclude = !isInSiteService
        ? getIdsArticlesFromOtherCollections(renderables, collectionsInPage)
        : [];

    const isInsideApertura = isInApertura(tree, featureId);

    const articlesToShow = !isInSiteService
        ? getArticleInCollection(
              idCollection,
              20,
              Number(initialPosition) - 1,
              idsArticlesToExclude,
              true,
              !isInSiteService,
              Number(notesQuantity)
          )
        : [];

    const error = validateFeature(
        idCollection,
        isInSiteService ? articlesFromCollectionSiteService : articlesToShow,
        `La colección ${idCollection} no encontró notas`
    );
    /* 
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



    try {
        const acuData = {
            tipoAcumulado: 3,
            name: 'author.byline'
        };
        return acuData;
    } catch (err) {
        return { Success: false, Message: err.message };
    }
};

export default CajaCollection;
//export default Consumer(CajaCollection);
*/
const CajaCollection = props => {
    //const CajaCollection = ({ children }) => {
    const {
        id: featureId,
        isAdmin,
        customFields: {
            idCollection,
            url,
            title,
            layout = '',
            backgroundColor,
            initialPosition,
            imageId,
            hideTitle,
            hideCaja
        },
        outputType,
        renderables,
        tree
    } = props;

    try {
        // const { collectionsInPage, notesQuantity } = getCommonPropsJson(props);
        /*         const articlesFromCollectionSiteService = getArticlesFromMyCurrentCollection(
            collectionsInPage,
            idCollection,
            Number(initialPosition) - 1,
            Number(notesQuantity)
        ); */

        const acuData = {
            tipoAcumulado: 3,
            name: 'author.byline'
        };
        return acuData;
    } catch (err) {
        return { Success: false, Message: err.message };
    }

    return 'Caja Collection';
};

export default CajaCollection;
