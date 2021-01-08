import React from 'react';
import Static from 'fusion:static';
import PropTypes from 'fusion:prop-types';
import PageBuilderMessage from '../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import getArticleInCollection from '../private/LN/common/utils/getArticleInCollection';
import CajaTema from '../private/LN/common/cajaTema';
import {
    cajaTemasCustomsFields,
    classRules
} from '../private/LN/common/utils/cajaTemasHelper';

const CajaTemaCollections = props => {
    const validateFeature = (idCollection, layout, notesQuantity) => {
        let error;
        if (!idCollection)
            error = {
                type: 'warning',
                message: 'Se requiere el id de la colección de la caja de temas'
            };

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

        if (layout === 'autor' && notesQuantity !== 3)
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
            notesQuantity !== 2 &&
            notesQuantity !== 4 &&
            notesQuantity % 3 !== 0
        )
            error = {
                type: 'warning',
                message:
                    'El diseño de Grilla requiere que sean 2, 3, 4, 6, 9 o 12 notas'
            };
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
            notesQuantity
        },
        outputType
    } = props;
    console.log("🚀 ~ file: cajaTemaCollections.jsx ~ line 32 ~ props", props.customFields)

    const error = validateFeature(idCollection, layout, notesQuantity);

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

    const articles = getArticleInCollection(
        idCollection,
        notesQuantity,
        initialPosition
    );
    console.log("🚀 ~ file: cajaTemaCollections.jsx ~ line 94 ~ articles", articles)

    const bgColor =
        backgroundColor !== 'default' && layout !== 'notaColor'
            ? '--bgcolor '
            : '';

    return (
        <Static id={featureId}>
            <CajaTema
                title={title}
                url={url}
                outputType={outputType}
                layout={layout}
                classCondition={classRules[layout]}
                articles={articles}
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
            label: 'ID de la collection',
            description: 'Ingrese aquí el ID de la collection',
            defaultValue: '',
            group: 'Custom Fields'
        }).isRequired,
        ...cajaTemasCustomsFields()
    }).isRequired
};

export default CajaTemaCollections;
