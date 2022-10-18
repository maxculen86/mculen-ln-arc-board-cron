/* eslint-disable react/require-default-props */
import React, { useContext } from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { GlobalContext } from '../../../../private/common/context/globalContext';
import ComButton from '../../../../private/common/com-button';
import {
    scrollToComments,
    onButtonClicked,
    GetNumberOfComments,
    addEventToDataLayer,
    getClassAndIconByBookmark
} from '../../../../private/LN/common/utils/shareHelper';
import { handleClickAudioNews } from '../../../../private/common/audioNews/helpers';
import '../../../../../resources/dist/css/ln/components/build-first-buttons-group.css';

const BuildFirtsButtonsGroup = ({
    termicaBookmark,
    globalContent,
    token,
    setBookmark,
    suscription,
    openPlayer,
    setOpenPlayer,
    enableButton,
    bookmark = ''
} = {}) => {
    const { arcSite = 'la-nacion-ar' } = useAppContext() || {};
    const { dispatch, state } = useContext(GlobalContext) || {};

    const {
        _id: id,
        comments: { display_comments: displayComments = true } = {},
        first_publish_date: firstPublishDate,
        isListenable
    } = globalContent;

    const { totalVisibleContent = '' } = GetNumberOfComments(
        firstPublishDate,
        arcSite,
        id
    );

    const { className, icon } = getClassAndIconByBookmark(bookmark);

    return (
        <div className="first-buttons-group">
            {isListenable && (
                <ComButton
                    id="btnAudio"
                    size="--fourxs"
                    iconName="headset"
                    title="Escuchar nota"
                    classCondition="headset --tertiary"
                    dataEvent="LinkClick"
                    dataSection="Escuchar Nota"
                    onClick={() => {
                        handleClickAudioNews(
                            token,
                            suscription,
                            setOpenPlayer,
                            dispatch
                        );
                    }}
                    textname="escuchar"
                    disabled={openPlayer || enableButton}
                />
            )}

            {termicaBookmark && (
                <ComButton
                    id="btnbookmark"
                    dataEvent="LinkClick"
                    dataSection="Guardar Nota"
                    onClick={() => {
                        onButtonClicked(
                            token,
                            suscription,
                            globalContent,
                            bookmark,
                            setBookmark,
                            dispatch,
                            state
                        );
                    }}
                    size="--fourxs"
                    iconName={icon}
                    title="Notas guardadas"
                    classCondition={`bookmark ${className}`}
                />
            )}

            {displayComments && (
                <ComButton
                    id="btncomments"
                    dataEvent="LinkClick"
                    dataSection="CompartirNotaLN"
                    onClick={() => {
                        scrollToComments();
                        addEventToDataLayer('Ir a los comentarios');
                    }}
                    size="--fivexs"
                    iconName="chat"
                    title="Ir a los comentarios de la nota"
                    classCondition="comment-btn"
                    textname={`${totalVisibleContent}`}
                />
            )}
        </div>
    );
};

BuildFirtsButtonsGroup.propTypes = {
    globalContent: PropTypes.shape({
        _id: PropTypes.string,
        subtype: PropTypes.string,
        first_publish_date: PropTypes.string,
        headlines: PropTypes.shape({
            basic: PropTypes.string,
            mobile: PropTypes.string
        }),
        comments: PropTypes.shape({
            display_comments: PropTypes.bool
        }),
        isListenable: PropTypes.bool
    }),
    token: PropTypes.string,
    bookmark: PropTypes.string,
    setBookmark: PropTypes.func,
    toast: PropTypes.shape({
        status: PropTypes.string,
        description: PropTypes.string,
        timeout: PropTypes.number
    }),
    suscription: PropTypes.bool,
    termicaBookmark: PropTypes.bool,
    openPlayer: PropTypes.bool,
    setOpenPlayer: PropTypes.func,
    enableButton: PropTypes.bool
};

export default BuildFirtsButtonsGroup;
