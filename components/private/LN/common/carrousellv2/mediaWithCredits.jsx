import React from 'react';
import MediaBase from '../media';

export default function mediaWithCredits({ mediaData }) {
    return (
        <>
            <MediaBase mediaData={mediaData}>
                {/* TODO: componentizar creditos y epigrafe y llamarlos aca */}
                <div>Fuente</div>
                <div>Credits</div>
                <div>Pagina 1 de 4</div>
            </MediaBase>
        </>
    );
}
