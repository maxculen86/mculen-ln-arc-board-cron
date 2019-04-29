import React from 'react';
import Buttom from '../../../common/containers/button';

export default function ShowMoreVideos(props) {
    return (
        <Buttom onClick={props.onClick} className={'mas --verde'}>
            Ver mas videos
        </Buttom>
    );
}
