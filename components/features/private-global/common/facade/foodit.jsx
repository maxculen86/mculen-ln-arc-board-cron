import React from 'react';
import { Image } from '@ln/foodit-ui-image';
import { getImagesToLoadWithPicture } from '../../../../private/LN/common/utils/mediaHelper';

const Facade = ({ id, altText, image, resizedUrls }) => {
    return (
        <div id={`facade-${id}`} data-testid={`facade-${id}`}>
            {/* TODO: agregar boton play */}
            <div id="button-play" />
            <Image
                alt={altText}
                src={image}
                className="w-100"
                fetchPriority="high"
                loading="eager"
                sources={getImagesToLoadWithPicture(resizedUrls)}
            />
        </div>
    );
};

export default Facade;
