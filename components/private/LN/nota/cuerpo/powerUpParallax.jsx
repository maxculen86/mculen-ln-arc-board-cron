import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import ComImage from '../../../common/com-image';
import '../../../../../resources/dist/css/ln/components/parallax.css';
import getImageResized from '../../../common/utils/getImageResized';

const Parallax = ({ data }) => {
    const { arcSite, outputType } = useAppContext();
    const isAmp = outputType === 'amp';
    const { imageConfig: { resize = {} } = {} } = getProperties(arcSite);
    const { fotoAl100: { promo_items: { sizes = [] } = {} } = {} } = resize;
    const {
        embed: {
            config: { imageId, title, paragraph }
        }
    } = data;

    const sizesNew = sizes.map(size => ({
        ...size,
        isNotSmart: true
    }));

    const imageContent = useContent({
        source: `${imageId ? 'imageSource' : null}`,
        query: { published: true, id: imageId.trim() }
    });

    if (!imageId || !imageContent || (!title && !paragraph)) return null;

    const {
        url: imageUrl,
        width: originalWidth,
        height: originalHeight,
        focal_point: focalPointObject,
        caption
    } = imageContent;

    const focalPoint = focalPointObject ? Object.values(focalPointObject) : [];

    const imageResized = getImageResized(
        imageUrl,
        originalWidth,
        originalHeight,
        sizesNew,
        focalPoint
    );

    const srcSet = imageResized
        ? imageResized.map(x => `${x.resizedUrl} ${x.option.width}w`).join()
        : '';

    return (
        <div className="container-parallax">
            <div className="image-container">
                <ComImage
                    src={imageUrl}
                    srcset={srcSet}
                    alt={caption}
                    amp={isAmp}
                    classCondition="--parallax"
                />
            </div>
            {title && (
                <div className="step-parallax">
                    <h2 className="bajada-titulo">{title}</h2>
                </div>
            )}
            {paragraph && (
                <div className="step-parallax">
                    <p className="bajada-parrafo">{paragraph}</p>
                </div>
            )}
        </div>
    );
};
Parallax.arcType = 'custom-parallax';
Parallax.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        subtype: PropTypes.string.isRequired,
        embed: PropTypes.shape({
            config: PropTypes.shape({
                imageId: PropTypes.string.isRequired,
                title: PropTypes.string,
                paragraph: PropTypes.string
            }).isRequired
        }).isRequired
    }).isRequired
};

export default Parallax;
