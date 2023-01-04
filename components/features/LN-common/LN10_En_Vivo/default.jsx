import React from 'react';
import PropTypes from 'fusion:prop-types';
import {
    A_FONDO,
    LIVEBLOG,
    LIVEBLOG_RED,
    SPONSORED,
    EXCLUSIVE_LN
} from '../../../private/common/badge/types';
import Badge from '../../../private/common/badge/Badge';
import { getFieldsFromNotes, getListOfTitlesAndIds } from './_helpers';
import BuildNote from './BuildNotes';

const styles = {
    0: A_FONDO,
    1: LIVEBLOG,
    2: LIVEBLOG_RED,
    3: SPONSORED,
    4: EXCLUSIVE_LN
};

const EnVivo = ({ customFields }) => {
    const { chapita = 'Vivo', chapitaStyle } = customFields || {};
    const listCustomFileds = Object.entries(customFields);
    const fields = getListOfTitlesAndIds(listCustomFileds);
    const typeBadge = !chapitaStyle ? 2 : chapitaStyle;

    return (
        <div>
            <Badge className={styles[typeBadge]} type={styles[typeBadge]}>
                {chapita.trim() ? chapita : 'Vivo'}
            </Badge>
            <div>
                {fields.map(({ noteId, title }) => (
                    <BuildNote
                        key={noteId}
                        noteId={noteId}
                        customTitle={title}
                    />
                ))}
            </div>
        </div>
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
        chapitaStyle: PropTypes.oneOf([0, 1, 2, 3, 4]).tag({
            labels: styles,
            label: 'Estilo Chapita',
            defaultValue: 2,
            group: 'Chapita'
        })
    }).isRequired
};

export default EnVivo;
