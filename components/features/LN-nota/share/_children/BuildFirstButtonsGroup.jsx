import React, { useEffect, useState, useRef } from 'react';
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
import {
    scrollToComments,
    onButtonClicked,
    getClassAndIconByBookmark,
    getFirstGroupClassNames,
    isLN10IAHidden
} from '../../../../private/LN/common/utils/shareHelper';
import useFetch from '../../../../private/common/hooks/useFetch';
import get from '../../../../private/common/utils/get';
import { conditionallyCallViafoura } from '../../../../private/common/utils/commentsHelper';
import useTermica from '../../../../private/common/hooks/useTermica';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';
import {
    getClassAndIconByClick,
    handleOpenIAFeature,
    IA_FEATURE_TRACKING_STORAGE
} from './helper';

import '../../../../../resources/packages/css/@ln/common-ui-tooltip/index.css';

function BuildFirtsButtonsGroup({
    termicaBookmark,
    globalContent,
    setBookmark,
    suscription,
    bookmark = '',
    subtypeVideo,
    openBarrier,
    openToast,
    onOperationComplete
} = {}) {
    const [tooltipWasClosed, setTooltipWasClosed] = useState(false);
    const [iaButtonIsClicked, setIaButtonIsClicked] = useState(false);

    const { renderables = [] } = useAppContext();

    const shareRef = useRef(null);

    const summary = get(globalContent, 'promo_items.summary', null);
    const isThermalSummaryEnabled = useTermica('resumen_nota');
    const glossary = get(globalContent, 'promo_items.glossary', null);
    const isThermalGlossaryEnabled = useTermica('glosario');

    const showIAButton =
        !isLN10IAHidden(renderables, glossary, summary) &&
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
        if (entry?.isIntersecting && suscription) openTooltip();
    }, [entry?.isIntersecting]);

    const {
        _id: id,
        comments: { display_comments: displayComments = true } = {},
        first_publish_date: firstPublishDate
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

    const classes = getFirstGroupClassNames({ subtypeVideo });

    const defaultTab =
        summary && isThermalSummaryEnabled ? 'resumen_nota' : 'glosario';

    useEffect(() => {
        const handleIaClosed = arg =>
            arg?.closed && setIaButtonIsClicked(false);
        window.LN.observable.subscribe('iaClosed', handleIaClosed);

        return () => {
            window.LN.observable.unsubscribe('iaClosed', handleIaClosed);
        };
    }, []);

    const TooltipContent = (
        <Text className="text-12_130 block">
            Leer el resumen y glosario generados por la inteligencia artificial.
        </Text>
    );

    // TODO: Abstraer botones para que el componente sea más prolijo y modular

    return (
        <div
            className={classes.firstGroupClasses}
            id="first-button-group"
            ref={shareRef}
        >
            {showIAButton && (
                <Tooltip
                    className="border border-all border-thin border-primary-ia shadow-xs rounded-4 bg-light-50"
                    position="right-center"
                    visible={tooltipVisible}
                    disableTrigger
                    content={TooltipContent}
                    style={{ maxWidth: '165px' }}
                >
                    <Button
                        id="btnIA"
                        title="Leer el resumen y glosario generados por la inteligencia artificial"
                        aria-label="Leer el resumen y glosario generados por la inteligencia artificial"
                        variant="secondary"
                        iconOnly
                        dataEvent="LinkClick"
                        dataSection="IA"
                        className={iaButtonClass}
                        onClick={() => {
                            handleOpenIAFeature({
                                defaultTab,
                                iaButtonIsClicked,
                                setIaButtonIsClicked,
                                suscription,
                                openBarrier,
                                callback: closeTooltip
                            });
                            setTooltipWasClosed(true);
                        }}
                    >
                        <Icon size={32}>{iaLogo}</Icon>
                    </Button>
                </Tooltip>
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
                            openBarrier,
                            openToast,
                            onOperationComplete
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
    }).isRequired,
    bookmark: PropTypes.string.isRequired,
    setBookmark: PropTypes.func.isRequired,
    toast: PropTypes.shape({
        status: PropTypes.string,
        description: PropTypes.string,
        timeout: PropTypes.number
    }).isRequired,
    suscription: PropTypes.bool.isRequired,
    termicaBookmark: PropTypes.bool.isRequired,
    subtypeVideo: PropTypes.string.isRequired,
    openBarrier: PropTypes.func.isRequired,
    openToast: PropTypes.func.isRequired,
    onOperationComplete: PropTypes.func.isRequired
};

export default BuildFirtsButtonsGroup;
