import React, { useEffect, useState, useRef } from 'react';
import { useAppContext } from 'fusion:context';
import { VIAFOURA_UUID } from 'fusion:environment';
import { Button } from '@ln/contenidos-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/contenidos-ui-text';
import classNames from 'classnames';
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
import { getClassAndIconByClick, handleOpenIAFeature } from './helper';

import '../../../../../resources/packages/css/@ln/common-ui-tooltip/index.css';

function BuildFirtsButtonsGroup({
    termicaBookmark,
    globalContent,
    setBookmark,
    suscription,
    bookmark = '',
    isNegative,
    openBarrier,
    isHorizontal
} = {}) {
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

    const classes = getFirstGroupClassNames({ isCustomLayout: isHorizontal });

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

    // TODO: Abstraer botones para que el componente sea más prolijo y modular

    return (
        <div
            className={classes.firstGroupClasses}
            id="first-button-group"
            ref={shareRef}
        >
            {showIAButton && (
                <Button
                    id="btnIA"
                    title="Leer resumen generado por inteligencia artificial"
                    aria-label="Leer resumen generado por inteligencia artificial"
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
                            openBarrier
                        });
                    }}
                >
                    <Icon size={32}>{iaLogo}</Icon>
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
                            openBarrier
                        );
                        addEventToDataLayerV2({
                            event: 'e_linkclick',
                            action: 'toolbard',
                            category: 'nota_ln9',
                            label: bookmark
                                ? 'eliminar_nota_guardada'
                                : 'guardar_nota'
                        });
                    }}
                    variant="secondary"
                    iconOnly
                    title="Guardar nota"
                    className={bookmarkClassCondition}
                    isNegative={isNegative}
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
                    isNegative={isNegative}
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

export default BuildFirtsButtonsGroup;
