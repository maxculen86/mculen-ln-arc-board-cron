import classNames from 'classnames';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { VIAFOURA_UUID } from 'fusion:environment';
import { useDisclosure } from '@ln/hooks';
import useAuthManager from '../../../private/common/auth/hooks/useAuthManager';
import useTermica from '../../../private/common/hooks/useTermica';
import useCheckBookmark from '../../../private/common/hooks/bookmark/useCheckBookmark';
import useShare from '../../../features/LN-nota/share/hooks/useShare';
import useFetch from '../../../private/common/hooks/useFetch';
import get from '../../../private/common/utils/get';
import {
    isSubscribed,
    SUBSCRIBED_HELPER
} from '../../../private/common/auth/helper/loginHelper';
import {
    getClassCondition,
    getClassAndIconByBookmark,
    onButtonClicked,
    scrollToComments,
    buttonsList,
    shareWhatsAppDesktop,
    isLN10IAHidden,
    getFirstGroupClassNames
} from '../../../private/LN/common/utils/shareHelper';
import {
    subtypesWithHorizontalShare,
    layoutBySubtype,
    shareContainerVariant,
    hasSticky,
    getClassAndIconByClick,
    handleOpenIAFeature
} from '../../../features/LN-nota/share/_children/helper';
import { conditionallyCallViafoura } from '../../../private/common/utils/commentsHelper';
import { addEventToDataLayerV2 } from '../../../private/LN/common/utils/addEventToDataLayer';
import CONFIG_BARRIER from '../../../features/LN-10-global/common/barrierRequiresSubscription/_config';
import { getConfigBarrierData } from '../../../features/LN-10-global/common/barrierRequiresSubscription/helpers';
import isSSR from '../../../private/LN/common/utils/isSSR';
import { buildSecondButtonsGroupVariants } from '../../../features/LN-nota/share/_children/styles';

const useVideoOpeningShare = ({
    globalContent,
    renderables,
    requestUri,
    host
}) => {
    const {
        _id: articleId,
        subtype = '',
        headlines: {
            basic: basicHeadline = '',
            mobile: mobileHeadline = ''
        } = {},
        promo_items: { summary = '', glossary = '' } = {},
        comments: { display_comments: displayComments = true } = {},
        first_publish_date: firstPublishDate
    } = globalContent || {};

    const [bookmark, setBookmark] = useState('');
    const [iaButtonIsClicked, setIaButtonIsClicked] = useState(false);

    const { token, accessToken } = useAuthManager();
    const termicaBookmark = useTermica('bookmark_web');
    const suscription = isSubscribed(SUBSCRIBED_HELPER.LN);

    const checkBookmarkId = useCheckBookmark(
        termicaBookmark,
        token,
        accessToken,
        articleId,
        suscription
    );

    const {
        isOpen: isBarrierOpen,
        onOpen: openBarrier,
        onClose: closeBarrier
    } = useDisclosure(false);

    useEffect(() => {
        if (termicaBookmark) setBookmark(checkBookmarkId);
    }, [termicaBookmark, checkBookmarkId]);

    const shareContainerRef = useRef(null);
    const shareRef = useRef(null);

    const layoutKey = layoutBySubtype[subtype];
    const subtypeVideo = getClassCondition(subtype);
    const isHorizontal = subtypesWithHorizontalShare.includes(subtype);

    const modShareContainerClass = shareContainerVariant({
        sticky: hasSticky(subtype),
        subtype: layoutKey
    });

    const shareClasses = classNames(
        'share',
        'flex relative z-100',
        isHorizontal
            ? 'mb-8_l'
            : 'flex-column_l bg-light-0 pb-16_l pt-8_l px-8_l'
    );

    const hrVideoClasses = classNames(
        isHorizontal && 'vertical border border-neutral-light-100'
    );

    const barrierConfig = useMemo(
        () => getConfigBarrierData(!!token, CONFIG_BARRIER),
        [token]
    );

    const redirectCallback = useMemo(
        () => (!isSSR() ? window.btoa(window.location.href) : ''),
        []
    );

    const isThermalSummaryEnabled = useTermica('resumen_nota');
    const isThermalGlossaryEnabled = useTermica('glosario');

    const showIAButton =
        !isLN10IAHidden(renderables, glossary, summary) &&
        ((summary && isThermalSummaryEnabled) ||
            (glossary && isThermalGlossaryEnabled));

    const defaultTab =
        summary && isThermalSummaryEnabled ? 'resumen_nota' : 'glosario';

    const { data } = useFetch({
        url: conditionallyCallViafoura(firstPublishDate)
            ? `https://livecomments.viafoura.co/v4/livecomments/${VIAFOURA_UUID}/contentcontainer/id?container_id=${articleId}`
            : null,
        options: {
            method: 'GET',
            headers: { accept: 'application/json' }
        }
    });

    const totalVisibleContent = get(data, 'total_visible_content', '');

    const { bookmarkClass, bookmarkIcon } = getClassAndIconByBookmark(bookmark);
    const bookmarkClassCondition = classNames('bookmark', bookmarkClass);

    const { iaLogo, iaButtonClass } = getClassAndIconByClick(iaButtonIsClicked);

    useEffect(() => {
        const handleIaClosed = arg =>
            arg?.closed && setIaButtonIsClicked(false);
        window.LN.observable.subscribe('iaClosed', handleIaClosed);
        return () => {
            window.LN.observable.unsubscribe('iaClosed', handleIaClosed);
        };
    }, []);

    const { copy, setCopy, shareButton } = useShare({
        mobileTitle: mobileHeadline,
        basic: basicHeadline,
        host,
        requestUri
    });

    const secondGroupClass = buildSecondButtonsGroupVariants({
        orientation: isHorizontal ? 'horizontal' : 'vertical'
    });

    const firstGroupClasses = getFirstGroupClassNames({
        isCustomLayout: isHorizontal
    });

    const handleIaClick = useCallback(() => {
        handleOpenIAFeature({
            defaultTab,
            iaButtonIsClicked,
            setIaButtonIsClicked,
            suscription,
            openBarrier
        });
    }, [defaultTab, iaButtonIsClicked, suscription, openBarrier]);

    const handleBookmarkClick = useCallback(() => {
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
            label: bookmark ? 'eliminar_nota_guardada' : 'guardar_nota'
        });
    }, [suscription, globalContent, bookmark, openBarrier]);

    const handleCommentsClick = useCallback(() => {
        scrollToComments();
        addEventToDataLayerV2({
            event: 'e_linkclick',
            action: 'toolbard',
            category: 'nota_ln9',
            label: 'ver_comentarios'
        });
    }, []);

    return {
        containerClass: modShareContainerClass,
        shareClasses,
        hrVideoClasses,
        barrier: {
            isOpen: isBarrierOpen,
            open: openBarrier,
            close: closeBarrier,
            button: barrierConfig.button,
            title: barrierConfig.title,
            message: barrierConfig.message,
            redirectCallback
        },
        iaButton: {
            show: showIAButton,
            className: iaButtonClass,
            icon: iaLogo,
            onClick: handleIaClick
        },
        bookmarkButton: {
            show: Boolean(termicaBookmark),
            className: bookmarkClassCondition,
            icon: bookmarkIcon,
            onClick: handleBookmarkClick
        },
        commentsButton: {
            show: displayComments,
            className: firstGroupClasses.commentsClasses,
            onClick: handleCommentsClick,
            totalVisibleContent
        },
        firstGroupWrapperClass: firstGroupClasses.firstGroupClasses,
        refs: {
            containerRef: shareContainerRef,
            shareRef
        },
        secondGroup: {
            wrapperClass: secondGroupClass,
            shareButton,
            copy,
            setCopy,
            buttons: buttonsList,
            shareWhatsApp: () => shareWhatsAppDesktop(requestUri, host)
        },
        meta: {
            articleId,
            host,
            basicHeadline,
            mobileHeadline,
            requestUri,
            subtypeVideo,
            bookmark,
            termicaBookmark
        }
    };
};

export default useVideoOpeningShare;
