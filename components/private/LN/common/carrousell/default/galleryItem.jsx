import React from 'react';
import MediaBase from '../../media';

export default function galleryItem({ mediaData, galleryOrder, totalGallery }) {
    return (
        <>
            <MediaBase mediaData={mediaData}>
                {/* TODO: componentizar creditos y epigrafe y llamarlos aca */}
                <section className="com-epigrafe">
                    <p className="text">Epigrafe</p>
                    <p className="small">
                        Fuente: LA NACION - Crédito: LA NACION
                    </p>
                </section>
                <p className="paginator">
                    {galleryOrder + 1}
                    &nbsp;de&nbsp;
                    {totalGallery}
                </p>
            </MediaBase>
        </>
    );
}
