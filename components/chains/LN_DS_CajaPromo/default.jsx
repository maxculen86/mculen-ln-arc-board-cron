import React from 'react';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import { useAppContext } from 'fusion:context';
import BuildRoof from '../utils/_BuildRoof/default';
import { useRoofData } from '../utils/_helpers';
import WarningMessage from '../../private/common/warningMessage/warningMessage';
import { typesButtonStyle } from '../utils/setCommonCustomFields';
import { validateGamesChain, shouldShowGamesCaja } from './common/_helper';
import { PromoProvider } from './common/promoContext';
import { CardDiagramation } from './diagramations/cardDiagramation';

const DIAGRAMATIONS = {
    oneLargeFourSmall: CardDiagramation.Featured,
    twoHorizontal: CardDiagramation.Half,
    fourVertical: CardDiagramation.Quarter,
    oneHorizontalThreeVertical: CardDiagramation.OneHorizontalThree
};

function LNDSCajaPromo({ customFields, children, ...props }) {
    const { isAdmin, layout, globalContent = {} } = useAppContext() || {};
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
        layout: diagramation,
        contentType = 'game'
    } = customFields;

    const shouldShowCaja = shouldShowGamesCaja({
        layout,
        globalContent,
        contentType
    });

    const error = validateGamesChain(
        layout,
        customFields,
        children,
        contentType
    );

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
        shouldLoadRoof: shouldShowCaja && !hideCaja
    });

    if (isAdmin && error) {
        return <WarningMessage type={error.type} message={error.message} />;
    }

    const Diagramation = DIAGRAMATIONS[diagramation];

    return shouldShowCaja && !hideCaja ? (
        <Static id={featureId}>
            <BuildRoof {...roofData} />
            <div data-tw style={{ display: 'contents' }}>
                <PromoProvider value={{ contentType }}>
                    <Diagramation>{children}</Diagramation>
                </PromoProvider>
            </div>
        </Static>
    ) : null;
}

LNDSCajaPromo.label = 'LN DS CajaPromo';

LNDSCajaPromo.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    customFields: PropTypes.shape({
        layout: PropTypes.oneOf([
            'oneLargeFourSmall',
            'twoHorizontal',
            'fourVertical',
            'oneHorizontalThreeVertical'
        ]).tag({
            label: 'Diagramación',
            description: 'Cambiar el diseño de la caja',
            group: 'Ajuste Cards',
            labels: {
                oneLargeFourSmall: 'Cards 1 + 4',
                twoHorizontal: 'Cards x 2',
                fourVertical: 'Cards x 4',
                oneHorizontalThreeVertical: 'Cards 1 + 3'
            }
        }),
        contentType: PropTypes.oneOf(['game', 'podcast']).tag({
            label: 'Tipo de contenido',
            description:
                'Determina el script de eventos y el tipo de diagramación',
            defaultValue: 'game',
            group: 'Ajuste Cards'
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
            defaultValue: false
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
            group: 'Techo'
        }),
        buttonText: PropTypes.string.tag({
            name: 'Texto del botón',
            description: 'Ingrese aquí el texto del botón',
            defaultValue: '',
            group: 'Techo'
        }),
        linkButton: PropTypes.string.tag({
            name: 'Url del botón',
            description:
                'Ingrese la url que redirige al hacer click al botón. El formato debe empezar con https://',
            defaultValue: '',
            group: 'Techo'
        }),
        buttonStyle: PropTypes.oneOf(Object.keys(typesButtonStyle)).tag({
            label: 'Estilo del botón',
            defaultValue: 'generic',
            description: 'Cambiar el estilo del botón del techo',
            group: 'Techo',
            labels: typesButtonStyle
        })
    }).isRequired
};

export default LNDSCajaPromo;
