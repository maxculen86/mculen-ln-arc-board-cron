/* eslint-disable react/require-default-props */
import React, { useContext, useEffect, useState, useRef } from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import { VIAFOURA_UUID } from 'fusion:environment';
import { useDisclosure, useIntersectionObserver } from '@ln/hooks';
import { Button } from '@ln/contenidos-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/contenidos-ui-text';
import { Tooltip } from '@ln/common-ui-tooltip';
import classNames from 'classnames';
import isSSR from '../../../../private/LN/common/utils/isSSR';
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
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';
import {
    getClassAndIconByClick,
    handleIaToggle,
    IA_FEATURE_TRACKING_STORAGE
} from './helper';

import '../../../../../resources/packages/css/@ln/common-ui-tooltip/index.css';
import getAudioEvents from '../../../LN-10-global/common/utils/getAudioEvents';
import handleCookie from '../../../../private/LN/common/utils/handleCookie';

function BuildFirtsButtonsGroup({
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
} = {}) {
    const [tooltipWasClosed, setTooltipWasClosed] = useState(false);
    const [iaButtonIsClicked, setIaButtonIsClicked] = useState(false);

    const { getCookie } = handleCookie();
    const [contentVariant] = useState(getCookie('contentVariant') || 'article');

    const { dispatch, state } = useContext(GlobalContext) || {};

    const { renderables = [], globalContentConfig = {} } = useAppContext();

    const shareRef = useRef(null);

    const summary = get(globalContent, 'promo_items.summary', null);
    const isThermalSummaryEnabled = useTermica('resumen_nota');
    const glossary = get(globalContent, 'promo_items.glossary', null);
    const isThermalGlossaryEnabled = useTermica('glosario');

    const showIAButton =
        !isLN10IAHidden(renderables) &&
        ((summary && isThermalSummaryEnabled) ||
            (glossary && isThermalGlossaryEnabled));

    const {
        isOpen: tooltipVisible,
        onClose: closeTooltip,
        onOpen: openTooltip
    } = useDisclosure(false);

    const aiFeatureWasDisplayed =
        !isSSR() &&
        localStorage.getItem(
            IA_FEATURE_TRACKING_STORAGE.key,
            IA_FEATURE_TRACKING_STORAGE.value
        );

    const shouldObserverShare =
        showIAButton && (aiFeatureWasDisplayed || tooltipWasClosed)
            ? null
            : shareRef?.current;

    const entry = useIntersectionObserver(shouldObserverShare, {
        rootMargin: '0px 0px -20% 0px'
    });

    useEffect(() => {
        if (entry?.isIntersecting) openTooltip();
    }, [entry?.isIntersecting]);

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

    const { bookmarkClass, bookmarkIcon } = getClassAndIconByBookmark(bookmark);
    const bookmarkClassCondition = classNames('bookmark', bookmarkClass);
    const { iaLogo, iaButtonClass } = getClassAndIconByClick(iaButtonIsClicked);

    const showListenButton =
        !useTermica('hide_listening_articles') && isListenable;

    const event =
        showListenButton &&
        getAudioEvents(globalContent, globalContentConfig, contentVariant);

    const classes = getFirstGroupClassNames({ subtypeVideo });

    const defaultTab =
        summary && isThermalSummaryEnabled ? 'resumen_nota' : 'glosario';

    // TODO: Abstraer botones para que el componente sea más prolijo y modular

    return (
        <div
            className={classes.firstGroupClasses}
            id="first-button-group"
            ref={shareRef}
        >
            {showIAButton && (
                <div className="relative flex">
                    <Button
                        id="btnIA"
                        title="IA"
                        variant="secondary"
                        iconOnly
                        dataEvent="LinkClick"
                        dataSection="IA"
                        className={iaButtonClass}
                        disabled={iaButtonIsClicked}
                        onClick={() => {
                            handleIaToggle({
                                defaultTab,
                                setIaButtonIsClicked,
                                callback: closeTooltip
                            });
                        }}
                    >
                        <Icon size={32}>{iaLogo}</Icon>
                    </Button>
                    <Tooltip
                        visible={tooltipVisible}
                        position="right"
                        className="rounded-4 text-12 px-8 py-12 line-height-130 text-light-50 bg-blue-500 w-max 2 z-10"
                        style={{ maxWidth: '272px' }}
                    >
                        <Icon size={16}>
                            <IconSprite name="iaTools" />
                        </Icon>
                        Leer el resumen y glosario generados por la inteligencia
                        artificial
                        <Button
                            onClick={() => {
                                closeTooltip();
                                setTooltipWasClosed(true);
                            }}
                            iconOnly
                            size="inherit"
                            variant="custom"
                            className="js-start"
                        >
                            <Icon size={20}>
                                <IconSprite name="close" fill="#fff" />
                            </Icon>
                        </Button>
                    </Tooltip>
                </div>
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
                            eventName: 'page_listened',
                            audioNewsActions: event
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
}

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
    globalContentConfig: PropTypes.shape({
        query: PropTypes.shape({
            uri: PropTypes.string
        })
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
