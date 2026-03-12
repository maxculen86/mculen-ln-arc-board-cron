import React from 'react';
import Media from '../../media';
import ComFigcaption from '../../../../common/com-figcaption';
import ComText from '../../../../common/text';
import EpigrafeAndCreditsData from '../../../../common/utils/epigrafeAndCreditsData';

const galleryItem = ({
    mediaData,
    galleryOrder,
    totalGallery,
    withZoom,
    itsGallery,
    handleClick,
    active,
    outputType
}) => {
    const credito = EpigrafeAndCreditsData(mediaData);

    return (
        <Media
            mediaData={mediaData}
            withZoom={withZoom}
            itsGallery={itsGallery}
            handleClick={handleClick}
            active={active}
            outputType={outputType}
        >
            {mediaData && (
                <ComFigcaption>
                    {mediaData.caption && (
                        <ComText
                            extraClass="--caption --twoxs"
                            text={mediaData.caption}
                        />
                    )}
                    <ComText extraClass="--credit --twoxs" text={credito} />
                    <ComText extraClass="com-text --paginator">
                        {galleryOrder + 1}
                        &nbsp;de&nbsp;
                        {totalGallery}
                    </ComText>
                </ComFigcaption>
            )}
        </Media>
    );
};

export default galleryItem;
