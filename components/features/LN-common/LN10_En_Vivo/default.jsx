import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { Live } from '@ln/contenidos-ui-live';
import { getFieldsFromNotes, getNotesLists, findError } from './_helpers';
import StaticContent from '../../../private/common/staticContent';
import get from '../../../private/common/utils/get';
import '../../../../resources/packages/css/@ln/contenidos-ui-live/index.css';
import '../../../../resources/packages/css/@ln/contenidos-ui-badge/index.css';
import { typeBadge } from '../../LN-10/article/common/_helper-WebApi';
import getDynamicBanners from '../../../private/common/banners/dynamicBanners/getDynamicBanners';
import setRender from '../../../chains/utils/setRender';

const EnVivo = ({ customFields, id: featureId }) => {
    const { isAdmin, renderables } = useAppContext() || {};
    const hideFeature = get(customFields, 'show', false);
    const chapita = get(customFields, 'chapita', 'vivo');
    const chapitaStyle = get(customFields, 'chapitaStyle', 2);
    const listCustomFileds = Object.entries(customFields);
    const articles = getNotesLists(listCustomFileds);
    const error = findError(articles);

    const { bannerMob = undefined } =
        getDynamicBanners({
            renderables,
            featureId
        }) || {};

    return (
        <StaticContent>
            {setRender({
                isAdmin,
                error,
                withSection: false,
                extraOptions: {
                    isEmpty: hideFeature && <></>,
                    default: !hideFeature && (
                        <>
                            <Live
                                notes={articles}
                                badgeText={
                                    chapita && chapita.trim() ? chapita : 'vivo'
                                }
                                badgeType={typeBadge[chapitaStyle]}
                            />
                            {bannerMob}
                        </>
                    )
                }
            })}
        </StaticContent>
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
            group: 'Chapita'
        }),
        chapitaStyle: PropTypes.oneOf([0, 1, 2]).tag({
            labels: typeBadge,
            label: 'Estilo Chapita',
            defaultValue: 2,
            group: 'Chapita'
        }),
        show: PropTypes.bool.tag({
            name: 'Ocultar ',
            description: 'Definí la visibilidad del "En vivo"',
            default: false
        })
    }).isRequired
};

export default EnVivo;
