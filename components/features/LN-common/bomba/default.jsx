/* eslint-disable react/require-default-props */
import React from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import getProperties from 'fusion:properties';

import FeatureArticulo from '../articulo/default';
import get from '../../../private/common/utils/get';

const BombaFeature = props => {
    const { customFields: { hideFeature, hideImage } = {} } = props;
    const { arcSite } = useAppContext();
    const { cajaTemaConfig } = getProperties(arcSite);

    const config = {
        config: get(cajaTemaConfig, `bomba1.articles[0]`, null),
        index: 0
    };

    return (
        (!hideFeature && (
            <section
                className={`mod-opening --bomba${(hideImage && ' --no-image') ||
                    ''}`}
                id="tema_00"
                data-is-block="true"
                data-block-name="h_tema-00"
                data-diagramacion-id="h_00"
            >
                <FeatureArticulo
                    {...props}
                    imageConfig="fotoAl100"
                    customConfig={config}
                    isBomba
                />
            </section>
        )) || <></>
    );
};

BombaFeature.label = 'LN Home Bomba';

BombaFeature.propTypes = {
    customFields: PropTypes.shape({
        noteId: PropTypes.string.tag({
            name: 'ID de la nota',
            description: 'Ingrese aquí el id de la nota',
            default: undefined,
            group: 'Ajustes Básicos'
        }).isRequired,
        title: PropTypes.string.tag({
            name: 'Título',
            description: 'Ingrese aquí el texto del título',
            default: undefined,
            group: 'Ajustes Básicos'
        }),
        lead: PropTypes.string.tag({
            name: 'Volanta',
            description: 'Ingrese aquí el texto de la volanta',
            group: 'Ajustes Básicos'
        }),
        imageId: PropTypes.string.tag({
            name: 'Foto',
            description: 'Ingrese aquí el id de la imagen en PhotoCenter',
            default: undefined,
            group: 'Ajustes Básicos'
        }),
        hideImage: PropTypes.bool.tag({
            name: 'Ocultar foto',
            description: 'Seleccione si no debe mostrarse la foto en la nota ',
            default: false,
            group: 'Ajustes Básicos'
        }),
        authors: PropTypes.string.tag({
            name: 'Firma',
            description: 'Ingrese aquí el texto de la marquesina',
            default: undefined,
            group: 'Ajustes Básicos'
        }),
        hideFeature: PropTypes.bool.tag({
            name: 'Ocultar Bomba',
            description: 'Seleccione si no debe mostrarse la bomba ',
            default: false,
            group: 'Ajustes Básicos'
        }),
        chapita: PropTypes.string.tag({
            name: 'Chapita',
            description: 'Ingrese aquí el texto de la chapita',
            default: undefined,
            group: 'Ajustes Extra'
        }),
        html: PropTypes.string.tag({
            name: 'Tablero / HTML',
            description: 'Ingrese aquí el html del tablero',
            default: undefined,
            group: 'Ajustes Extra'
        })
    })
};

export default BombaFeature;
