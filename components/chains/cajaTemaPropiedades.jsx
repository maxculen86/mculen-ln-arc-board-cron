import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import PageBuilderMessage from '../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import CajaTemasPropiedades from '../private/LN/acumulado/CajaTemasPropiedades';
import filter from '../../content/filters/LN/acumulado/articleAcu';
import withCollectionsInClass from '../private/LN/acumulado/hocs/withCollectionsInClass';

class CajaTemaPropiedades extends React.Component {
    validateFeature = idCollection => {
        let error;
        if (!idCollection)
            error = {
                type: 'warning',
                message: 'Se requiere el id de la colección de la caja de temas'
            };
        return error;
    };

    validateArticles = articles => {
        if (!articles) return false;
        if (articles.length < 2) return false;
        return true;
    };

    render() {
        const {
            id: featureId,
            isAdmin,
            customFields: { idCollection, url, title },
            outputType,
            articlesInCollection = []
        } = this.props;

        const error = this.validateFeature(idCollection);

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

        if (!this.validateArticles(articlesInCollection)) return null;
        const articlesToShow =
            articlesInCollection.length >= 3 && articlesInCollection.length < 6
                ? articlesInCollection.slice(0, 3)
                : articlesInCollection.slice(0, 6);

        // Se usa este evento para que GrillaNota pueda ver los articulos a excluir
        // doc https://lanacionar.arcpublishing.com/alc/arc-products/pagebuilder/fusion/documentation/recipes/messaging-between-components.md?version=2.6
        this.dispatchEvent('articlesInBox', {
            articlesInBox: articlesToShow,
            message: 'Articles.'
        });

        return (
            <CajaTemasPropiedades
                title={title}
                url={url}
                articlesToShow={articlesToShow}
                outputType={outputType}
                size="6"
                idCollection={idCollection}
            />
        );
    }
}

CajaTemaPropiedades.label = 'LN Acum Caja Tema Propiedades';

CajaTemaPropiedades.propTypes = {
    id: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    outputType: PropTypes.bool.isRequired,
    customFields: PropTypes.shape({
        idCollection: PropTypes.string.tag({
            label: 'ID de la collection',
            description: 'Ingrese aquí el ID de la collection',
            defaultValue: '',
            group: 'Custom Fields'
        }),
        url: PropTypes.string.tag({
            label: 'Url',
            description:
                'Ingrese la url que redirige al hacer click al titulo. El formato debe empezar con https://',
            defaultValue: '',
            group: 'Custom Fields'
        }),
        title: PropTypes.string.tag({
            name: 'Título / Techo',
            description: 'Ingrese aquí el título de la caja de temas',
            defaultValue: '',
            group: 'Custom Fields'
        })
    }).isRequired,
    articlesInCollection: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string
        })
    )
};

export default withCollectionsInClass(Consumer(CajaTemaPropiedades), filter, 6);
