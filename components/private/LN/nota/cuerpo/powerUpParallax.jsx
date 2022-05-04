import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import ComImage from '../../../common/com-image';
import '../../../../../resources/dist/css/ln/components/parallax.css';
import { filteredSources } from '../apertura/AperturaStorytelling/component';
import useViewportSize from '../../../common/hooks/useViewportSize';
import Text from '../../../common/text';

const Parallax = ({ data = {} }) => {
    const { outputType } = useAppContext();
    const isAmp = outputType === 'amp';

    const [device, setDevice] = useState('desktop');
    const dev = useViewportSize();
    useEffect(() => {
        setDevice(dev);
    }, [dev]);

    const {
        embed: {
            config: { imageId, title, paragraph }
        }
    } = data;
    const {
        url: imageUrl,
        caption,
        resized_urls: imagesResized,
        width,
        height
    } = imageId;

    if (!imageId || (!title && !paragraph)) return null;

    const sourcesForDevice = filteredSources(imagesResized, device, isAmp);
    const srcSet = sourcesForDevice
        ? sourcesForDevice.map(x => `${x.resizedUrl} ${x.option.width}w`).join()
        : '';

    return (
        <div className="container-parallax">
            <div className="image-container">
                <ComImage
                    src={imageUrl}
                    srcset={srcSet}
                    alt={caption}
                    amp={isAmp}
                    width={width}
                    height={height}
                    classCondition="--parallax"
                />
            </div>
            <div className="step-parallax">
                {title && (
                    <Text
                        tag="h2"
                        extraClass="bajada-titulo"
                        font="sueca"
                        weight="bold"
                    >
                        {title}
                    </Text>
                )}
                {paragraph && (
                    <Text
                        tag="p"
                        extraClass="bajada-parrafo"
                        font="georgia"
                        size="small"
                    >
                        {paragraph}
                    </Text>
                )}
            </div>
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
                imageId: PropTypes.shape({
                    id: PropTypes.string,
                    url: PropTypes.string,
                    width: PropTypes.number,
                    height: PropTypes.number,
                    focalPoint: PropTypes.arrayOf(PropTypes.number),
                    caption: PropTypes.string,
                    resized_urls: PropTypes.arrayOf(
                        PropTypes.shape({
                            resizedUrl: PropTypes.string,
                            option: PropTypes.shape({
                                width: PropTypes.number,
                                height: PropTypes.number
                            })
                        })
                    )
                }).isRequired,
                title: PropTypes.string,
                paragraph: PropTypes.string
            }).isRequired
        }).isRequired
    }).isRequired
};

export default Parallax;
