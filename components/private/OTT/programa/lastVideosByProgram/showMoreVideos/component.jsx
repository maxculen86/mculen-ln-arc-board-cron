import React from 'react';

export default function ShowMoreVideos(props) {
    return (
        <button onClick={props.onClick} className="mas --verde">
            Ver mas videos
        </button>
    );
}
