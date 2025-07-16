/* eslint-disable react/prop-types */
import React from 'react';
import { useAppContext } from 'fusion:context';
import { getLiveBlogEditorialDataApertura } from '../../../LN-Nota-Liveblog_Editorial/_helpers/liveblogEditorialApertura';
import MediaVideo100 from './MediaVideo100';
import DescriptionVideo100 from './DescriptionVideo100';

function AperturaVideo100({ children }) {
    const { globalContent } = useAppContext();
    const { dataMedia, dataDescripcion } =
        getLiveBlogEditorialDataApertura(globalContent);

    return (
        <div className="video-100-opening">
            <MediaVideo100 data={dataMedia} />
            <DescriptionVideo100 data={dataDescripcion} />
            <div className="lay pt-24">{children}</div>
        </div>
    );
}

export default AperturaVideo100;
