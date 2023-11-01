import React from 'react';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import { transformImages } from './helperJw';
import get from '../../utils/get';

export const Facade = ({ id = '', playlist = [], title = '' }) => {
    const [video] = playlist || {};
    return (
        <div id={`facade-${id}`} className="content-facade-jw">
            <div id="button-play" className="button-play" />
            <Adaptableimage
                sources={transformImages(get(video, 'images', []))}
                src={get(video, 'image', '')}
                className="com-image"
                alt={title}
            />
        </div>
    );
};
