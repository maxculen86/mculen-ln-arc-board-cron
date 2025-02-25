import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { Badge } from '@ln/contenidos-ui-badge';
import StaticContentV2 from '../../../chains/LN10-global/staticContentV2';
import {
    setUpdatesCustomFields,
    getUpdatesFromCustomFields,
    setWarning
} from './_helpers';
import { typeBadge } from '../../LN-10/article/common/_helper-WebApi';
import get from '../../../private/common/utils/get';
import setRender from '../../../chains/utils/setRender';
import { isInSection } from '../anexo/common/_helper-WebApi';
import LiveNew from '../live/LiveNew';

function Ticker({ customFields, id: featureId }) {
    const { isAdmin, renderables } = useAppContext() || {};
    const hideFeature = get(customFields, 'show', false);
    const chapita = get(customFields, 'chapita', '');
    const chapitaStyle = get(customFields, 'chapitaStyle', 2);
    const updates = getUpdatesFromCustomFields(customFields);
    const errorMessage = setWarning({ hideFeature, updates });

    const isApertura = isInSection({
        sectionName: 'Apertura',
        id: featureId,
        renderables
    });

    const section = isApertura ? 'apertura' : 'pre-apertura';

    if (updates.length === 0 && !isAdmin) return null;

    return (
        <StaticContentV2 {...{ id: featureId }}>
            {setRender({
                isAdmin,
                error: errorMessage,
                withSection: true,
                chainId: featureId,
                extraOptions: {
                    isEmpty: hideFeature && null,
                    default: !hideFeature && (
                        <LiveNew data-testid="live-component">
                            <LiveNew.Section section={section}>
                                <div className="live-notes relative w-100 overflow-hidden">
                                    <LiveNew.Body>
                                        {chapita && (
                                            <Badge
                                                className="ai-center mr-8"
                                                type={typeBadge[chapitaStyle]}
                                                text={chapita}
                                            />
                                        )}
                                        {updates.length !== 0 ? (
                                            <LiveNew.Notes>
                                                {updates.map(update => (
                                                    <LiveNew.Note
                                                        key={update.title}
                                                        url={update.link}
                                                        title={update.title}
                                                    >
                                                        {update.title}
                                                    </LiveNew.Note>
                                                ))}
                                            </LiveNew.Notes>
                                        ) : null}
                                    </LiveNew.Body>
                                </div>
                            </LiveNew.Section>
                        </LiveNew>
                    )
                }
            })}
        </StaticContentV2>
    );
}

Ticker.label = 'LN10_Ticker';

Ticker.propTypes = {
    id: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        ...(setUpdatesCustomFields() || {}),
        show: PropTypes.bool.tag({
            name: 'Ocultar ',
            description: 'Definí la visibilidad del "Ticker"',
            default: false
        }),
        chapita: PropTypes.string.tag({
            name: 'Texto de la chapita',
            description: 'Ingrese aquí el texto de la chapita',
            default: '',
            group: 'Chapita Para Novedades'
        }),
        chapitaStyle: PropTypes.oneOf([0, 1, 2]).tag({
            labels: typeBadge,
            label: 'Estilo de la chapita',
            defaultValue: 2,
            group: 'Chapita Para Novedades'
        })
    }).isRequired
};

export default Ticker;
