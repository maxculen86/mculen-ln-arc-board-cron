import React from 'react';
import Static from 'fusion:static';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import PageBuilderMessage from '../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import getArticleInCollection from '../private/LN/common/utils/getArticleInCollection';
import CajaTema from '../private/LN/common/cajaTema';
import cajaTemasCustomsFields from '../private/LN/common/utils/cajaTemasHelper';
import config from '../../properties/sites/la-nacion-ar';
import get from '../private/common/utils/get';

const CajaTemaCollections = props => {
    const validateFeature = (idCollection, layout) => {
        let error;
        if (!idCollection)
            error = {
                type: 'warning',
                message: 'Se requiere el id de la colección de la caja de temas'
            };
        /*
        if (layout === 'focalRight' && notesQuantity !== 2)
            error = {
                type: 'warning',
                message: 'El diseño Focal Derecho requiere solo 2 notas'
            };

        if (layout === 'focalLeft' && notesQuantity !== 3)
            error = {
                type: 'warning',
                message: 'El diseño Focal Izquierdo requiere solo 3 notas'
            };

        if (layout === 'author' && notesQuantity !== 3)
            error = {
                type: 'warning',
                message: 'El diseño de Autor requiere solo 3 notas'
            };

        if (layout === 'notaColor' && notesQuantity !== 3)
            error = {
                type: 'warning',
                message: 'El diseño de Notas a Color requiere solo 3 notas'
            };

        if (
            layout === 'grilla' &&
            notesQuantity !== 1 &&
            notesQuantity !== 2 &&
            notesQuantity % 3 !== 0
        )
            error = {
                type: 'warning',
                message:
                    'El diseño de Grilla requiere que sean 1, 2, 3, 6, 9 o 12 notas'
            };
            */
        return error;
    };

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
            hideTitle
        },
        outputType,
        globalContent
    } = props;

    const { cajaTemaCss = {} } = config || {};
    const { collectionsInPage = [] } = globalContent || {};
    const error = validateFeature(idCollection, layout);
    const notesQuantity = layout.slice(-1);
    const totalArticlesInCollections = collectionsInPage.reduce(
        (total, currentValue) => {
            return total + currentValue.articles.length;
        },
        0
    );
    console.log("🚀 ~ file: cajaTemaCollections.jsx ~ line 86 ~ totalArticlesInCollections", totalArticlesInCollections)
    const currentCollection = collectionsInPage.find(
        collect => collect.idCollection === idCollection
    );
    // console.log("🚀 ~ file: cajaTemaCollections.jsx ~ line 32 ~ articlesInCollection", currentCollection)
    const articlesFiltered = currentCollection
        ? currentCollection.articles.slice(initialPosition - 1, notesQuantity)
        : [];
    // console.log("🚀 ~ file: cajaTemaCollections.jsx ~ line 32 ~ articlesFiltered", articlesFiltered)

    if (isAdmin || error) {
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
    /*
    const articles = getArticleInCollection(
        idCollection,
        notesQuantity,
        initialPosition
    );
    */
    const bgColor =
        backgroundColor !== 'default' && layout !== 'notaColor'
            ? '--bgcolor '
            : '';
    const classCondition = cajaTemaCss[layout];

    return (
        <Static id={featureId}>
            <CajaTema
                title={title}
                hideTitle={hideTitle}
                url={url}
                imageId={imageId}
                outputType={outputType}
                layout={layout}
                classCondition={classCondition}
                articles={articlesFiltered}
                notesQuantity={notesQuantity}
                backgroundColor={
                    backgroundColor !== 'default'
                        ? `${bgColor}${backgroundColor}`
                        : ''
                }
            />
        </Static>
    );
};

CajaTemaCollections.label = 'LN Caja Tema Collections';

CajaTemaCollections.propTypes = {
    id: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    outputType: PropTypes.bool.isRequired,
    customFields: PropTypes.shape({
        idCollection: PropTypes.string.tag({
            label: 'ID',
            description: 'Ingrese aquí el ID de la collection',
            defaultValue: '',
            group: 'Ajuste Collection'
        }).isRequired,
        ...cajaTemasCustomsFields()
    }).isRequired
};

export default Consumer(CajaTemaCollections);
