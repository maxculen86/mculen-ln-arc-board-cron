import React from 'react';
import PropTypes from 'fusion:prop-types';
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
        <>
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
                                //text={mediaData.caption}
                            >
                                {mediaData.caption}
                            </ComText>
                        )}
                        <ComText
                            extraClass="--credit --twoxs"
                            //text={credito}
                        >
                            {credito}
                        </ComText>
                        <ComText extraClass="--paginator">
                            {galleryOrder + 1}
                            &nbsp;de&nbsp;
                            {totalGallery}
                        </ComText>
                    </ComFigcaption>
                )}
            </Media>
        </>
    );
};

galleryItem.propTypes = {
    mediaData: PropTypes.shape({
        distributor: PropTypes.string,
        caption: PropTypes.string,
        vanity_credits: PropTypes.array,
        credits: PropTypes.array
    }).isRequired,
    withZoom: PropTypes.string.isRequired,
    totalGallery: PropTypes.number.isRequired,
    galleryOrder: PropTypes.number.isRequired,
    itsGallery: PropTypes.bool.isRequired,
    active: PropTypes.bool.isRequired,
    handleClick: PropTypes.func.isRequired
};

export default galleryItem;
