import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { Live } from '@ln/contenidos-ui-live';
import {
    getFieldsFromNotes,
    getNotesLists,
    findError,
    validateId,
    getTopicsFromCustomFields,
    setTopicsCustomFields
} from './_helpers';
import get from '../../../private/common/utils/get';
import { typeBadge } from '../../LN-10/article/common/_helper-WebApi';
import getDynamicBanners from '../../../private/common/banners/dynamicBanners/getDynamicBanners';
import setRender from '../../../chains/utils/setRender';
import {
    findPositionInsideSection,
    getMarkupForDatalayer
} from '../../../private/LN/common/utils/cajaTemasHelper';
import { getDataAttributesForViewability } from '../../../features/LN-10/article/_helper';
import StaticContentV2 from '../../../chains/LN10-global/staticContentV2';

const EnVivo = ({ customFields, id: featureId }) => {
    const { isAdmin, renderables } = useAppContext() || {};
    const hideFeature = get(customFields, 'show', false);
    const chapita = get(customFields, 'chapita', 'vivo');
    const chapitaStyle = get(customFields, 'chapitaStyle', 2);
    const listCustomFields = Object.entries(customFields);
    const articles = getNotesLists(listCustomFields);
    const error = findError(articles);

    const { bannerMob = undefined } =
        getDynamicBanners({
            renderables,
            featureId
        }) || {};

    const positionInsideSection = findPositionInsideSection(
        featureId,
        renderables
    );

    const LIVE_POSITION = '97';

    const { extraOptsDiv, extraOpts: viewabilityData } = getMarkupForDatalayer(
        'EnVivo',
        '',
        LIVE_POSITION,
        '',
        positionInsideSection,
        ''
    );

    const articlesWithData = articles
        .map((article, index) => {
            const trimmedId = validateId(article.id);
            return {
                ...article,
                id: trimmedId,
                ...getDataAttributesForViewability(
                    trimmedId,
                    LIVE_POSITION,
                    index
                )
            };
        })
        .filter(article => validateId(article.id));

    const topics = getTopicsFromCustomFields(customFields);

    return (
        <StaticContentV2 {...{ ...extraOptsDiv, id: featureId }}>
            {setRender({
                isAdmin,
                error,
                withSection: true,
                chainId: featureId,
                viewabilityData,
                extraOptions: {
                    isEmpty: hideFeature && <></>,
                    default: !hideFeature && (
                        <>
                            <Live
                                notes={articlesWithData}
                                badgeText={
                                    chapita && chapita.trim() ? chapita : 'vivo'
                                }
                                badgeType={typeBadge[chapitaStyle]}
                                data-testid="live-component"
                            >
                                {topics.length !== 0 ? (
                                    <Live.Topics tags={topics} />
                                ) : (
                                    <></>
                                )}
                            </Live>
                            {bannerMob}
                        </>
                    )
                }
            })}
        </StaticContentV2>
    );
};

EnVivo.label = 'LN10_En_Vivo';

EnVivo.propTypes = {
    id: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        ...getFieldsFromNotes(1),
        ...getFieldsFromNotes(2),
        ...getFieldsFromNotes(3),
        chapita: PropTypes.string.tag({
            name: 'Texto de chapita',
            description: 'Ingrese aquí el texto de la chapita',
            default: 'Vivo',
            group: 'Chapita para VIVOS'
        }),
        chapitaStyle: PropTypes.oneOf([0, 1, 2]).tag({
            labels: typeBadge,
            label: 'Estilo Chapita',
            defaultValue: 2,
            group: 'Chapita para VIVOS'
        }),
        show: PropTypes.bool.tag({
            name: 'Ocultar ',
            description: 'Definí la visibilidad del "En vivo"',
            default: false
        }),
        ...(setTopicsCustomFields() || {})
    }).isRequired
};

export default EnVivo;
