import React from 'react';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import { transformImages } from './helperJw';
import get from '../../utils/get';

export const Facade = ({ title, playlist }) => {
    const [video] = playlist || {};
    return (
        <div id={`facade-${title}`} className="content-facade-jw">
            <div id="button-play" className="button-play" />
            <Adaptableimage
                sources={transformImages(get(video, 'images', []))}
                src={get(video, 'image', '')}
                className="com-image"
            />
        </div>
    );
};
