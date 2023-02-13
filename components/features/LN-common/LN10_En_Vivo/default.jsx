import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { Live } from '@ln/contenidos-ui-live';
import { getFieldsFromNotes, getNotesLists, findError } from './_helpers';
import PageBuilderMessage from '../../../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import StaticContent from '../../../private/common/staticContent';
import get from '../../../private/common/utils/get';
import '../../../../resources/packages/css/@ln/contenidos-ui-live/index.css';
import '../../../../resources/packages/css/@ln/contenidos-ui-badge/index.css';
import { typeBadge } from '../../LN-10/article/_helper';

const EnVivo = ({ customFields }) => {
    const { isAdmin } = useAppContext() || {};

    if (get(customFields, 'show', false)) return <></>;

    const chapita = get(customFields, 'chapita', 'vivo');
    const chapitaStyle = get(customFields, 'chapitaStyle', 2);
    const listCustomFileds = Object.entries(customFields);
    const articles = getNotesLists(listCustomFileds);
    const err = findError(articles);

    if (isAdmin && err) {
        return (
            <PageBuilderMessage
                type="warning"
                message={`El ID de la nota ${err.group} (ID: ${err.id}) es incorrecto`}
            />
        );
    }

    return (
        <StaticContent>
            <Live
                notes={articles}
                badgeText={chapita.trim() ? chapita : 'vivo'}
                badgeType={typeBadge[chapitaStyle]}
            />
        </StaticContent>
    );
};

EnVivo.label = 'LN10_En_Vivo';

EnVivo.propTypes = {
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
