/* eslint-disable react/require-default-props */
import React, { useContext } from 'react';
import PropTypes from 'fusion:prop-types';
import AudioPlayer from '.';
import useFetch from '../hooks/useFetch';
import LoadingIcon from '../../LN/common/loadingIcon';
import get from '../utils/get';
import { getMessageError, getEndpointAudioNews } from './helpers';
import { GlobalContext } from '../context/globalContext';

const BuildAudioPlayer = ({ setOpenPlayer, publishDate = '', noteId = '' }) => {
    const { dispatch } = useContext(GlobalContext) || {};

    const [data, loading, error] = useFetch({
        url: getEndpointAudioNews(publishDate, noteId)
    });

    const audioUrl = get(data, 'audio_url');

    if (error) {
        getMessageError(error, dispatch);
        setOpenPlayer(false);
        return <></>;
    }

    return <>{loading ? <LoadingIcon /> : <AudioPlayer audio={audioUrl} />}</>;
};

BuildAudioPlayer.propTypes = {
    publishDate: PropTypes.string,
    noteId: PropTypes.string,
    setOpenPlayer: PropTypes.func
};

export default BuildAudioPlayer;
