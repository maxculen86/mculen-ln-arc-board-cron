import React, { useContext, useState } from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import { VIAFOURA_UUID } from 'fusion:environment';
import { Button } from '@ln/contenidos-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/contenidos-ui-text';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import { GlobalContext } from '../../../../private/common/context/globalContext';
import {
    scrollToComments,
    onButtonClicked,
    getClassAndIconByBookmark,
    getFirstGroupClassNames,
    isLN10IAHidden
} from '../../../../private/LN/common/utils/shareHelper';
import { handleClickAudioNews } from '../../../../private/common/audioNews/helpers';
import useFetch from '../../../../private/common/hooks/useFetch';
import get from '../../../../private/common/utils/get';
import { conditionallyCallViafoura } from '../../../../private/common/utils/commentsHelper';
import eventHandler from '../../../../private/common/audioNews/trackerAudioNews';
import useTermica from '../../../../private/common/hooks/useTermica';
import getToken from '../../../../private/common/utils/getToken';
import classNames from 'classnames';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';
import { handleIaToggle } from './helper';

const BuildFirtsButtonsGroup = ({
    termicaBookmark,
    globalContent,
    token,
    setBookmark,
    suscription,
    openPlayer,
    setOpenPlayer,
    enableButton,
    bookmark = '',
    subtypeVideo
} = {}) => {
    const { dispatch, state } = useContext(GlobalContext) || {};

    const { renderables = [] } = useAppContext();

    const {
        _id: id,
        comments: { display_comments: displayComments = true } = {},
        first_publish_date: firstPublishDate,
        isListenable
    } = globalContent;

    const { data } = useFetch({
        url: conditionallyCallViafoura(firstPublishDate)
            ? `https://livecomments.viafoura.co/v4/livecomments/${VIAFOURA_UUID}/contentcontainer/id?container_id=${id}`
            : null,
        options: {
            method: 'GET',
            headers: {
                accept: 'application/json'
            }
        }
    });

    const totalVisibleContent = get(data, 'total_visible_content', '');
    const accessToken = getToken('access-token');

    const { bookmarkClass, bookmarkIcon } = getClassAndIconByBookmark(bookmark);
    const bookmarkClassCondition = classNames('bookmark', bookmarkClass);

    const showListenButton =
        !useTermica('hide_listening_articles') && isListenable;

    const glossary = get(globalContent, 'promo_items.glossary', null);
    const isThermalGlossaryEnabled = useTermica('glosario');

    const summary = get(globalContent, 'promo_items.summary', null);
    const isThermalSummaryEnabled = useTermica('resumen_nota');

    const showIAButton =
        !isLN10IAHidden(renderables) &&
        ((summary && isThermalSummaryEnabled) ||
            (glossary && isThermalGlossaryEnabled));

    const classes = getFirstGroupClassNames({ subtypeVideo });

    const [isIaVisible, setIsIaVisible] = useState(false);

    // TODO: Abstraer botones para que el componente sea más prolijo y modular
    return (
        <div className={classes.firstGroupClasses}>
            {showIAButton && (
                <Button
                    id="btnIA"
                    title="IA"
                    variant="secondary"
                    iconOnly
                    dataEvent="LinkClick"
                    dataSection="IA"
                    className="ia"
                    onClick={() => handleIaToggle(isIaVisible, setIsIaVisible)}
                >
                    <Icon size={40} color="inherit">
                        <IconSprite name="iaGeneric" default fill="#FFFFFF" />
                    </Icon>
                </Button>
            )}
            {showListenButton && (
                <Button
                    id="btnAudio"
                    title="Escuchar nota"
                    variant="primary"
                    className={classes.displayClasses}
                    iconOnly
                    dataEvent="LinkClick"
                    dataSection="Escuchar Nota"
                    onClick={() => {
                        handleClickAudioNews(
                            token,
                            suscription,
                            setOpenPlayer,
                            dispatch
                        );
                        eventHandler({
                            activeWindow: window,
                            action: 'listenButton',
                            eventLabel: 'escuchar'
                        });
                    }}
                    disabled={openPlayer || enableButton}
                >
                    <Icon size={24} color="inherit">
                        <IconSprite name="listen" />
                    </Icon>
                </Button>
            )}
            {termicaBookmark && (
                <Button
                    id="btnbookmark"
                    dataEvent="LinkClick"
                    dataSection="Guardar Nota"
                    onClick={() => {
                        onButtonClicked(
                            suscription,
                            globalContent,
                            bookmark,
                            setBookmark,
                            dispatch,
                            state
                        );
                    }}
                    variant="secondary"
                    iconOnly
                    title="Notas guardadas"
                    className={bookmarkClassCondition}
                    isNegative={subtypeVideo}
                >
                    <Icon size={24} color="inherit">
                        {bookmarkIcon}
                    </Icon>
                </Button>
            )}
            {displayComments && (
                <Button
                    id="btncomments"
                    dataEvent="LinkClick"
                    dataSection="CompartirNotaLN"
                    onClick={() => {
                        scrollToComments();
                        addEventToDataLayerV2({
                            event: 'e_linkclick',
                            action: 'toolbard',
                            category: 'nota_ln9',
                            label: 'ver_comentarios'
                        });
                    }}
                    variant="secondary"
                    title="Ir a los comentarios de la nota"
                    className={classes.commentsClasses}
                    isNegative={subtypeVideo}
                    size="inherit"
                >
                    <Icon size={24} color="inherit">
                        <IconSprite name="chat" />
                    </Icon>
                    <Text>{totalVisibleContent}</Text>
                </Button>
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
    enableButton: PropTypes.bool,
    subtypeVideo: PropTypes.string
};
export default BuildFirtsButtonsGroup;
