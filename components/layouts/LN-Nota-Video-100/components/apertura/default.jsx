import React from 'react';
import { useAppContext } from 'fusion:context';
import {
    getLiveBlogEditorialDataApertura,
    getMediaItem
} from '../../../LN-Nota-Liveblog_Editorial/_helpers/liveblogEditorialApertura';
import BreadcrumbArticle from '../../../../features/LN-nota/breadcrumbArticle';
import ReadingTime from '../../../../features/LN-10-global/common/readingTime/default';

function AperturaVideo100() {
    // TODO: SE DEBE AGREGAR EN EL IMAGE CONFIG LAS DIMENSIONES DEL VIDEO EN LA APERTURA CUANDO SE DEFINA PARA EL RESIZER.
    const { globalContent } = useAppContext();
    const { dataMedia, dataDescripcion, dataEpigraph } =
        getLiveBlogEditorialDataApertura(globalContent);

    const mediaItem = getMediaItem(dataMedia.mediaData);

    const { title, date, time } = dataDescripcion;

    const { caption, credit } = dataEpigraph;

    return (
        <div>
            {mediaItem}
            <h1>{title}</h1>
            <p>Fecha: {date}</p>
            <p>Hora: {time}</p>
            <p>{caption}</p>
            <p>{credit}</p>
            <ReadingTime />
            <BreadcrumbArticle />
        </div>
    );
}

export default AperturaVideo100;
