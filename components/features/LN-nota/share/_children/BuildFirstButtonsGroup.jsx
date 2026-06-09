import React, { useRef } from 'react';
import { useAppContext } from 'fusion:context';
import { VIAFOURA_UUID } from 'fusion:environment';
import { Button } from '@ln/contenidos-ui-button';
import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/contenidos-ui-text';
import classNames from 'classnames';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import IconLn from '../../../ui/ln/icon/default';
import {
    scrollToComments,
    onButtonClicked,
    getClassAndIconByBookmark,
    getFirstGroupClassNames
} from '../../../../private/LN/common/utils/shareHelper';
import useFetch from '../../../../private/common/hooks/useFetch';
import get from '../../../../private/common/utils/get';
import { conditionallyCallViafoura } from '../../../../private/common/utils/commentsHelper';
import useTermica from '../../../../private/common/hooks/useTermica';
import { addEventToDataLayerV2 } from '../../../../private/LN/common/utils/addEventToDataLayer';
import { barrierMessages } from '../../../LN/common/barrierRequiresSubscription/helper';
import {
    openIaSummary,
    isIaSummaryAvailable
} from '../../../LN/common/iaSummary/helpers';
import { useIaSummaryState } from '../../../LN/common/iaSummary/hooks/useIaSummaryState';
import { useIaSummaryActions } from '../../../LN/common/iaSummary/hooks/useIaSummaryActions';

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
    const { renderables = [] } = useAppContext();

    const shareRef = useRef(null);

    const summaryData = get(
        globalContent,
        'promo_items.summary.embed.config.arrayBullets',
        []
    );
    const isThermalSummaryEnabled = useTermica('resumen_nota');

    const showIAButton = isIaSummaryAvailable({
        renderables,
        summaryData,
        isThermalSummaryEnabled
    });

    // Estado/acciones del store compartido del Resumen con IA.
    const { isOpen: isSummaryOpen } = useIaSummaryState();
    const { close } = useIaSummaryActions();

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

    const classes = getFirstGroupClassNames({ isCustomLayout: isHorizontal });

    const closeEvent = {
        event: 'e_linkclick',
        action: 'IA',
        category: 'nota_ln9',
        label: 'cerrar_ia'
    };

    const handleSummaryClick = () => {
        if (isSummaryOpen) {
            close();
            addEventToDataLayerV2(closeEvent);
            return;
        }

        openIaSummary({
            suscription,
            openBarrier: () => openBarrier(barrierMessages.IA_SUMMARY),
            event: {
                event: 'e_linkclick',
                action: 'IA',
                category: 'nota_ln9',
                label: 'resumen_nota'
            },
            closeEvent
        });
    };

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
                    onClick={handleSummaryClick}
                >
                    {/* data-tw habilita los estilos del DS/tailwind sobre el Icon de UI */}
                    <div data-tw>
                        <IconLn
                            name={
                                isSummaryOpen ? 'sparkling-filled' : 'sparkling'
                            }
                        />
                    </div>
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
