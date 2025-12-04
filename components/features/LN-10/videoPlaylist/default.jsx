import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import { useContent } from 'fusion:content';
import { checkForId } from '../article/common/_helper-WebApi';
import { validateVideoPlaylist } from './_helper';
import WarningMessage from '../../../private/common/warningMessage/warningMessage';

function VideoPlaylist({ customFields, isAdmin, id }) {
    const { playlistId } = customFields;

    const playlistData = useContent({
        source: checkForId(playlistId) && isAdmin ? 'jwPlaylistSource' : null,
        query: {
            playlistId: checkForId(playlistId)
        }
    });

    const error = validateVideoPlaylist({ playlistData, playlistId });

    if (error && isAdmin) {
        return (
            <article data-feature-id={id}>
                <WarningMessage
                    key={id}
                    type={error.type}
                    message={error.message}
                />
            </article>
        );
    }

    return null;
}

VideoPlaylist.label = 'LN10 VideoPlaylist';

VideoPlaylist.propTypes = {
    customFields: PropTypes.shape({
        playlistId: PropTypes.string.tag({
            name: 'ID de playlist de JW',
            description: 'Ingrese aquí el ID de playlist de JW',
            defaultValue: ''
        }),
        shouldSchedule: PropTypes.boolean.tag({
            name: 'Activar Calendarización',
            description:
                'Marque para mostrar en los días configurados. Desmarque para mostrar todos los días.',
            defaultValue: false
        }),
        enabledDays: PropTypes.list.tag({
            name: 'Días habilitados',
            description:
                'Ingrese los días de la semana en los que se desea mostrar la caja (en minúsculas, sin tildes, ej: "miercoles")',
            defaultValue: []
        })
    }).isRequired,
    isAdmin: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired
};

export default Consumer(VideoPlaylist);
