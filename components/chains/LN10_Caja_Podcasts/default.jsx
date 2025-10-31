import React from 'react';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import { useAppContext } from 'fusion:context';
import BuildRoof from '../utils/_BuildRoof/default';
import { useRoofData } from '../utils/_helpers';
import VideoPodcastEventsScript from '../../private/common/scriptManager/VideoPodcastEventsScript';
import { typesButtonStyle } from '../utils/setCommonCustomFields';
import WarningMessage from '../../private/common/warningMessage/warningMessage';
import {
    getGameDiagramationItems,
    validateGamesChain
} from '../LN10_Caja_Juegos_v2/common/_helper';
import DiagramationCard from '../../features/LN-common/Juego/diagramationCard';

function CajaPodcasts({ customFields, children, ...props }) {
    const { isAdmin, layout } = useAppContext();
    const { id: featureId } = props;

    const {
        logoId,
        link,
        hideTitle,
        hideCaja,
        title,
        navigator,
        buttonLogo,
        buttonText,
        linkButton,
        buttonStyle,
        layout: diagramation
    } = customFields;

    const error = validateGamesChain(layout, customFields, children, 'podcast');

    const roofData = useRoofData({
        logoId,
        link,
        hideTitle,
        hideCaja,
        title,
        navigator,
        buttonLogo,
        buttonText,
        linkButton,
        buttonStyle,
        isStatic: true,
        shouldLoadRoof: !hideCaja
    });

    if (isAdmin && error) {
        return <WarningMessage type={error.type} message={error.message} />;
    }

    return !hideCaja ? (
        <Static id={featureId}>
            <BuildRoof {...roofData} />
            <div className="grid gap-24 mb-32">
                <DiagramationCard variant={diagramation} type="podcast">
                    {getGameDiagramationItems(children, diagramation)}
                </DiagramationCard>
            </div>
            <VideoPodcastEventsScript />
        </Static>
    ) : null;
}

CajaPodcasts.label = 'LN10 Caja Podcasts';

CajaPodcasts.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    customFields: PropTypes.shape({
        layout: PropTypes.oneOf([
            'oneLargeFourSmall',
            'twoHorizontal',
            'fourVertical'
        ]).tag({
            label: 'Diagramación',
            description: 'Cambiar el diseño de la caja',
            group: 'Ajuste Podcasts',
            labels: {
                oneLargeFourSmall: 'Podcasts 1 + 4',
                twoHorizontal: 'Podcasts x 2',
                fourVertical: 'Podcasts x 4'
            }
        }),
        logoId: PropTypes.string.tag({
            name: 'Logo',
            description: 'Ingrese aquí el id de Photo Center de la imagen',
            defaultValue: '',
            group: 'Techo'
        }),
        link: PropTypes.url.tag({
            label: 'Url',
            description:
                'Ingrese la url que redirige al hacer click al titulo. El formato debe empezar con https://',
            defaultValue: '',
            group: 'Techo'
        }),
        title: PropTypes.string.tag({
            name: 'Texto',
            description: 'Ingrese aquí el título de la caja.',
            defaultValue: '',
            group: 'Techo'
        }),
        hideTitle: PropTypes.boolean.tag({
            name: 'Ocultar techo',
            description: 'Marque para ocultar el techo',
            defaultValue: true,
            group: 'Techo'
        }),
        hideCaja: PropTypes.boolean.tag({
            name: 'Ocultar Caja',
            description: 'Marque para ocultar la caja',
            defaultValue: false,
            hidden: false
        }),
        navigator: PropTypes.string.tag({
            name: 'Navegador',
            description:
                'Ingrese aquí el nombre de una navegación creada en site services',
            defaultValue: '',
            group: 'Techo'
        }),
        buttonLogo: PropTypes.string.tag({
            name: 'Logo Botón',
            description: 'Ingrese aquí el id del botón',
            defaultValue: '',
            group: 'Techo',
            hidden: false
        }),
        buttonText: PropTypes.string.tag({
            name: 'Texto del botón',
            description: 'Ingrese aquí el texto del botón',
            defaultValue: '',
            group: 'Techo',
            hidden: false
        }),
        linkButton: PropTypes.string.tag({
            name: 'Url del botón',
            description:
                'Ingrese la url que redirige al hacer click al botón. El formato debe empezar con https://',
            defaultValue: '',
            group: 'Techo',
            hidden: false
        }),
        buttonStyle: PropTypes.oneOf(Object.keys(typesButtonStyle)).tag({
            label: 'Estilo del boton',
            defaultValue: 'generic',
            description: 'Cambiar el diseño de la caja',
            group: 'Techo',
            labels: typesButtonStyle,
            hidden: false
        })
    }).isRequired
};

export default CajaPodcasts;
