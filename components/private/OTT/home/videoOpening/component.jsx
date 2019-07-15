import React from 'react';

export default function VideoOpening(props) {
    return (
        <section className={'apertura'}>
            <iframe
                width="100%"
                src={props.source}
                frameBorder="0"
                allowFullScreen=""
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            />
        </section>
    );
}
