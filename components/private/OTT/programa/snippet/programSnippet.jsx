/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import getStreams from '../../../LN/common/utils/getStreams';
import VideoPlayerSnippet from '../../../common/scriptManager/snippetVideo';

const ProgramSnippet = props => {
    const { globalContent = {} } = props;
    const {
        duration = 0,
        headlines: { basic = '' },
        promo_items = {},
        created_date = '',
        streams = []
    } = globalContent;

    const minStream = getStreams(streams);
    const descriptionRegex = /^([\+A-Za-z0-9\s]+)(\s?\-\s?)(\d{1,2}\s(de\s)?[a-zA-Z]+\s(del\s)?\d{4})$/g;
    const descriptionElements = descriptionRegex.exec(basic) || [];
    const description =
        descriptionElements[1] && descriptionElements[3]
            ? `Mira el programa ${descriptionElements[1]}en su edición del ${descriptionElements[3]}`
            : basic;

    const mediaData = {
        promo_items,
        duration,
        created_date,
        headlines: {
            basic: description
        }
    };

    return (
        <VideoPlayerSnippet
            mediaData={mediaData}
            minStream={minStream}
            parrafo={description}
            tituloNota={basic}
        />
    );
};

ProgramSnippet.propTypes = {
    globalContent: PropTypes.shape({
        duration: PropTypes.number,
        headlines: PropTypes.shape({
            basic: PropTypes.string
        }),
        promo_items: PropTypes.shape(),
        created_date: PropTypes.string,
        streams: PropTypes.array
    }).isRequired
};

export default ProgramSnippet;
