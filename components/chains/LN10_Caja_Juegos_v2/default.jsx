import React from 'react';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import { useAppContext } from 'fusion:context';
import get from '../../private/common/utils/get';
import BuildRoof from '../utils/_BuildRoof/default';
import { useRoofData } from '../utils/_helpers';
import config from '../../../properties/sites/la-nacion-ar';
import GameEventScript from '../../private/common/scriptManager/GameEventsScript';
import { typesButtonStyle } from '../utils/setCommonCustomFields';
import WarningMessage from '../../private/common/warningMessage/warningMessage';
import { getGameDiagramationItems, validateGamesChain } from './common/_helper';
import DiagramationCard from '../../features/LN-common/Juego/diagramationCard';
import '../../../resources/packages/css/@ln/contenidos-ui-roof/index.css';

const { layoutsName = {} } = config || {};

function CajaJuegosV2({ customFields, children, ...props }) {
    const { globalContent = {}, layout, isAdmin } = useAppContext() || {};
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

    const { id: featureId } = props;

    const shouldShowGame =
        layout === layoutsName.Infografia
            ? get(globalContent, 'label.mostrar_caja_juegos.text', '') ===
              'Mostrar'
            : true;

    const error = validateGamesChain(layout, customFields, children);

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
        shouldLoadRoof: shouldShowGame && !hideCaja
    });

    if (isAdmin && error) {
        return <WarningMessage type={error.type} message={error.message} />;
    }

    return shouldShowGame && !hideCaja ? (
        <Static id={featureId}>
            <BuildRoof {...roofData} />
            <div className="grid gap-24 mb-32">
                <DiagramationCard variant={diagramation} type="game">
                    {getGameDiagramationItems(children, diagramation)}
                </DiagramationCard>
            </div>
            <GameEventScript />
        </Static>
    ) : null;
}

CajaJuegosV2.label = 'LN10 Caja Juegos v2';

CajaJuegosV2.propTypes = {
    id: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        layout: PropTypes.oneOf([
            'oneLargeFourSmall',
            'twoHorizontal',
            'fourVertical',
            'oneHorizontalThreeVertical'
        ]).tag({
            label: 'Diagramación',
            description: 'Cambiar el diseño de la caja',
            group: 'Ajuste Juegos',
            labels: {
                oneLargeFourSmall: 'Juegos 1 + 4',
                twoHorizontal: 'Juegos x 2',
                fourVertical: 'Juegos x 4',
                oneHorizontalThreeVertical: 'Juegos 1 + 3'
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
            name: 'Logo Boton',
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
    }).isRequired,
    children: PropTypes.node.isRequired
};

export default CajaJuegosV2;
