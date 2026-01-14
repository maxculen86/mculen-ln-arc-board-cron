import React, { useEffect, useState } from 'react';
import { useAppContext } from 'fusion:context';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import '../../../../../resources/dist/css/ln/components/parallax.css';
import useViewportSize from '../../../common/hooks/useViewportSize';
import useProportions from '../../../common/hooks/useProportions';
import Text from '../../../common/text';
import { getImagesToLoadWithPicture } from '../../common/utils/mediaHelper';

function Parallax({ data = {} }) {
    const { globalContent: { subtype = 8 } = {} } = useAppContext();
    const dev = useViewportSize();
    const [device, setDevice] = useState(dev);

    useEffect(() => {
        setDevice(dev);
    }, [dev]);

    const {
        embed: {
            config: { imageId, title, paragraph }
        }
    } = data;
    const {
        url,
        caption,
        resized_urls: imagesResized,
        width,
        height
    } = imageId;

    const sourcesForDevice = useProportions({
        resizedUrls: imagesResized,
        device,
        subtype
    });

    if (!imageId || !imagesResized || (!title && !paragraph)) return null;

    const imageUrl =
        (Array.isArray(imagesResized) &&
            imagesResized[imagesResized.length - 1]?.resizedUrl) ||
        url;

    return (
        <div className="container-parallax">
            <div className="image-container">
                <Adaptableimage
                    width={width}
                    alt={caption}
                    height={height}
                    src={imageUrl}
                    className="com-image --parallax"
                    fetchPriority="low"
                    loading="lazy"
                    sources={getImagesToLoadWithPicture(
                        false,
                        sourcesForDevice
                    )}
                />
            </div>
            {title && (
                <div className="step-parallax">
                    <Text tag="h2" extraClass="bajada-titulo" weight="bold">
                        {title}
                    </Text>
                </div>
            )}
            {paragraph && (
                <div className="step-parallax">
                    <Text
                        tag="p"
                        extraClass="bajada-parrafo"
                        font="georgia"
                        size="small"
                    >
                        {paragraph}
                    </Text>
                </div>
            )}
        </div>
    );
}
Parallax.arcType = 'custom-parallax';

export default Parallax;
