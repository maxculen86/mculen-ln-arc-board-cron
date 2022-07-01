import React from 'react';
import PropTypes from 'fusion:prop-types';
import ComTitle from '../../private/common/com-title';
import get from '../../private/common/utils/get';

const VideoOpening = ({ customFields } = {}) => {
    const hideVideoFeature = get(customFields, 'hideVideoFeature', false);
    const url = get(customFields, 'url', '');

    if (hideVideoFeature || url.trim() === '') return <></>;

    return (
        <>
            <section className="apertura">
                <iframe
                    title="live"
                    width="100%"
                    src={url}
                    frameBorder="0"
                    allowFullScreen=""
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                />
            </section>
            <section>
                <ComTitle
                    content="LN+ En Vivo"
                    tag="h1"
                    classCondition="section-title"
                />
            </section>
        </>
    );
};

VideoOpening.propTypes = {
    customFields: PropTypes.shape({
        url: PropTypes.string.tag({
            name: 'url',
            description: 'Ingrese aquí la url del live',
            default: ''
        }).isRequired,
        hideVideoFeature: PropTypes.bool.tag({
            label: 'Ocultar',
            description: 'Marque para ocultar el video',
            defaultValue: false
        })
    }).isRequired
};

VideoOpening.label = 'OTT Video en vivo';

export default VideoOpening;
