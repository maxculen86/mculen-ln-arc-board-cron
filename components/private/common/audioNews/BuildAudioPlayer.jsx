/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import AudioPlayer from '.';
import useFetch from '../hooks/useFetch';
import LoadingIcon from '../../LN/common/loadingIcon';
import get from '../utils/get';
import { parseDate } from './helpers';
import '../../../../resources/dist/css/ln/components/audio-player-button.css';

const AUDIO_NEWS_URL =
    'https://qa-audionews.lanacion.com.ar/api/v1/audio/status/';

const getEndpointAudioNews = (publishDate, noteId) => {
    const date = parseDate(publishDate);
    return date && noteId ? `${AUDIO_NEWS_URL}${date}/${noteId}/` : null;
};

const BuildAudioPlayer = ({ publishDate = '', noteId = '' }) => {
    const [data, loading, error] = useFetch({
        url: getEndpointAudioNews(publishDate, noteId)
    });
    const audioUrl = get(data, 'audio_url');

    return <>{loading ? <LoadingIcon /> : <AudioPlayer audio={audioUrl} />}</>;
};

BuildAudioPlayer.propTypes = {
    publishDate: PropTypes.string,
    noteId: PropTypes.string
};

export default BuildAudioPlayer;
