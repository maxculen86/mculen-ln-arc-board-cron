import React from 'react';
import PropTypes from 'fusion:prop-types';
import Media from '../../media';
import ComFigcaption from '../../../../common/com-figcaption';
import ComText from '../../../../common/com-text';
import EpigrafeAndCreditsData from '../../../../common/utils/epigrafeAndCreditsData';

const galleryItem = ({
    mediaData,
    galleryOrder,
    totalGallery,
    withZoom,
    itsGallery
}) => {
    const credito = EpigrafeAndCreditsData(mediaData);
    return (
        <>
            <Media
                mediaData={mediaData}
                withZoom={withZoom}
                itsGallery={itsGallery}
            >
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
};

galleryItem.propTypes = {
    mediaData: PropTypes.shape({
        distributor: PropTypes.string,
        caption: PropTypes.string,
        vanity_credits: PropTypes.arrayOf,
        credits: PropTypes.arrayOf
    }).isRequired,
    withZoom: PropTypes.string.isRequired,
    totalGallery: PropTypes.number.isRequired,
    galleryOrder: PropTypes.number.isRequired,
    itsGallery: PropTypes.bool.isRequired
};

export default galleryItem;
