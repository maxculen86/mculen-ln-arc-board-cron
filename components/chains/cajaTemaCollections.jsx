import React from 'react';
import Static from 'fusion:static';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import PageBuilderMessage from '../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import CajaTema from '../private/LN/common/cajaTema';
import {
    cajaTemasCustomsFields,
    getArticlesFromMyCurrentCollection
} from '../private/LN/common/utils/cajaTemasHelper';
import config from '../../properties/sites/la-nacion-ar';

const CajaTemaCollections = props => {
    const validateFeature = idCollection => {
        let error;
        if (!idCollection)
            error = {
                type: 'warning',
                message: 'Se requiere el id de la colección de la caja de temas'
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
            imageId,
            hideTitle
        },
        outputType,
        globalContent
    } = props;

    const { cajaTemaCss = {} } = config || {};
    const { collectionsInPage = [] } = globalContent || {};
    const error = validateFeature(idCollection);
    const notesQuantity = layout.slice(-1);
    // TODO: ver con daro
    const bgColor =
        backgroundColor !== 'default' && layout !== 'notaColor'
            ? '--bgcolor '
            : '';
    const classCondition = cajaTemaCss[layout];

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

    const articlesFiltered = getArticlesFromMyCurrentCollection(
        collectionsInPage,
        idCollection,
        initialPosition,
        notesQuantity
    );

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

CajaTemaCollections.label = 'LN Caja Collections';

CajaTemaCollections.propTypes = {
    id: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    outputType: PropTypes.bool.isRequired,
    customFields: PropTypes.shape({
        ...cajaTemasCustomsFields('cajaTemaCollections')
    }).isRequired
};

export default Consumer(CajaTemaCollections);
