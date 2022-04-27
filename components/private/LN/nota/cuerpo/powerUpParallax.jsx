import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import ComImage from '../../../common/com-image';
import '../../../../../resources/dist/css/ln/components/parallax.css';

const Parallax = ({ data }) => {
    const {
        embed: {
            config: { imageId, title, paragraph }
        }
    } = data;

    const imageContent = useContent({
        source: 'imageSource',
        query: { published: true, id: imageId.trim() }
    });

    const { url: imageUrl, caption } = imageContent;

    if (!imageId || !imageContent || (!title && !paragraph)) return null;

    return (
        <div className="container-parallax">
            <div className="image-container">
                <ComImage
                    src={imageUrl}
                    alt={caption}
                    amp={false}
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
