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
    addEventToDataLayer
} from '../../../../private/LN/common/utils/shareHelper';
import { handleClickAudioNews } from '../../../../private/common/audioNews/helpers';
import '../../../../../resources/dist/css/ln/components/build-first-buttons-group.css';

const BuildFirtsButtonsGroup = ({
    termicaBookmark,
    bookmark,
    globalContent,
    token,
    setBookmark,
    setToast,
    suscription,
    toast,
    openPlayer,
    setOpenPlayer
} = {}) => {
    const { arcSite = 'la-nacion-ar' } = useAppContext() || {};
    const { dispatch } = useContext(GlobalContext) || {};

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

    return (
        <div className="first-buttons-group">
            {isListenable && (
                <ComButton
                    size="--fourxs"
                    iconName="headset"
                    title="Escuchar nota"
                    classCondition="headset --tertiary"
                    onClick={() =>
                        handleClickAudioNews(
                            token,
                            suscription,
                            setOpenPlayer,
                            dispatch
                        )
                    }
                    textname="escuchar"
                    disabled={openPlayer}
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
                            toast,
                            globalContent,
                            bookmark,
                            setBookmark,
                            setToast,
                            dispatch
                        );
                    }}
                    size="--fourxs"
                    iconName={bookmark ? 'bookmark-filled' : 'bookmark'}
                    title="Notas guardadas"
                    classCondition={`bookmark ${bookmark ? '--is-saved' : ''}`}
                />
            )}

            {displayComments && (
                <>
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
                </>
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
    bookmark: PropTypes.bool,
    setBookmark: PropTypes.func,
    toast: PropTypes.bool,
    setToast: PropTypes.func,
    suscription: PropTypes.bool,
    termicaBookmark: PropTypes.bool,
    openPlayer: PropTypes.bool,
    setOpenPlayer: PropTypes.func
};

export default BuildFirtsButtonsGroup;
