import React from 'react';
import Media from '../../media';
import ComFigcaption from '../../../../common/com-figcaption';
import ComText from '../../../../common/com-text';
import EpigrafeAndCreditsData from '../../../../common/utils/epigrafeAndCreditsData';

export default function galleryItem({
    mediaData,
    galleryOrder,
    totalGallery,
    withZoom
}) {
    const credito = EpigrafeAndCreditsData(mediaData);
    return (
        <>
            <Media mediaData={mediaData} withZoom={withZoom}>
                {mediaData && (
                    <ComFigcaption>
                        {mediaData.caption && (
                            <ComText
                                classCondition="--caption"
                                textname={mediaData.caption}
                            />
                        )}
                        <ComText classCondition="--credit" textname={credito} />
                    </ComFigcaption>
                )}
                <p className="paginator">
                    {galleryOrder + 1}
                    &nbsp;de&nbsp;
                    {totalGallery}
                </p>
            </Media>
        </>
    );
}
