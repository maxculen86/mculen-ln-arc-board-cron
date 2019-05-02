import React from 'react';
import Button from '../../../../common/button';

export default function ShowMoreVideos(props) {
    return (
        <Button onClick={props.onClick} className={'mas --verde'}>
            Ver mas videos
        </Button>
    );
}
