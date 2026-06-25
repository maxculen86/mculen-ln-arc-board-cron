import React, { useEffect, useState } from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import useViewportSize from '../../../private/common/hooks/useViewportSize';
import { StickyMobile } from '../../LN-10-global/common/stickyMobile/default';
import { crtViewTracker } from '../../../private/common/utils/noteTracker/ctrTracker';
import useNotaSegment from '../../../private/LN/common/hooks/useNotaSegment';
import getRenderState from '../../../private/LN/common/utils/segmentation/getRenderState';
import PageBuilderMessage from '../../../private/LN/home/common/components/pageBuilderMessage/pageBuilderMessage';
import {
    isSubscribed,
    SUBSCRIBED_HELPER
} from '../../../private/common/auth/helper/loginHelper';
import { getSectionId } from '../../LN-10/ranking/common/_helper-WebApi';
import { useRankingArticles } from '../../LN-10/ranking/_helper';
import { replaceUrlsByEnvironment } from '../../../private/common/utils/replaceProductiveImgDomain';
import { pickVisible3 } from './_utils/pickVisible3';
import {
    hasStickyMobileSegmentationConfig,
    normalizeDigitList
} from './_utils/segmentation';

const STICKY_MOBILE_SCROLL_TRIGGER = 1800;
const SEGMENTATION_GROUP = 'Segmentación A/B';
const STICKY_MOBILE_STORAGE_KEY = 'SegmentoStickyMobile';
const EMPTY_DIGITS = [];

export function CtrNotaV2({ customFields = {}, isAdmin = false } = {}) {
    const {
        experimentName = '',
        segmentAndHide = false,
        testDigits = EMPTY_DIGITS,
        controlDigits = EMPTY_DIGITS
    } = customFields;
    const { website = '', arcSite = '', globalContent = {} } = useAppContext();
    const { _id } = globalContent;
    const sectionId = getSectionId(globalContent) || '';

    const [trigger, setTrigger] = useState(false);
    const [tracked, setTracker] = useState(true);
    const [excludedItems, setExcludedItems] = useState([]);
    const [source, setSource] = useState(null);
    const normalizedTestDigits = normalizeDigitList(testDigits);
    const normalizedControlDigits = normalizeDigitList(controlDigits);

    const segmentationEnabled = hasStickyMobileSegmentationConfig({
        experimentName,
        segmentAndHide,
        testDigits: normalizedTestDigits,
        controlDigits: normalizedControlDigits
    });

    const { segment, ready } = useNotaSegment({
        experimentName: segmentationEnabled ? experimentName : '',
        testDigits: segmentationEnabled ? normalizedTestDigits : EMPTY_DIGITS,
        controlDigits: segmentationEnabled
            ? normalizedControlDigits
            : EMPTY_DIGITS,
        syncStorage: segmentationEnabled,
        storageKey: STICKY_MOBILE_STORAGE_KEY
    });

    useEffect(() => {
        if (localStorage) {
            const seenNotes =
                JSON.parse(localStorage.getItem('excludeItems')) || [];

            setExcludedItems(seenNotes.map(note => new URL(note).pathname));
        }
        const handleScroll = () => {
            const scrolledInAxisY = window.scrollY;
            if (!source && scrolledInAxisY >= 1000)
                setSource('rankingArticlesSource');

            if (!trigger && scrolledInAxisY >= STICKY_MOBILE_SCROLL_TRIGGER) {
                setTrigger(true);
                window.removeEventListener('scroll', handleScroll);
            }
        };
        if (!trigger) window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [trigger, source]);

    const isMobile = useViewportSize() === 'mobile';
    const showCtr = !isSubscribed(SUBSCRIBED_HELPER.LN) && isMobile;

    const { articles = [] } =
        useRankingArticles(
            sectionId,
            website || arcSite,
            '',
            'ctrMobile',
            source
        ) || {};

    const hasNoArticles = articles?.length === 0;
    const segmentationConfigError =
        !experimentName ||
        (!normalizedTestDigits.length && !normalizedControlDigits.length);
    const { shouldRender: shouldRenderSegmentedSticky, warning } =
        segmentationEnabled
            ? getRenderState({
                  hasSection: Boolean(_id),
                  isAdmin,
                  segmentationConfigError,
                  segmentAndHide,
                  ready,
                  activeSegment: segment
              })
            : { shouldRender: true };

    if (warning) {
        return (
            <PageBuilderMessage type={warning.type} message={warning.message} />
        );
    }

    if (!showCtr || hasNoArticles) return null;

    const refinedTopThreeArticles = replaceUrlsByEnvironment(
        pickVisible3(_id, articles, excludedItems)
    );
    const hasContent = refinedTopThreeArticles?.length > 0;
    const showComponent =
        showCtr && trigger && hasContent && shouldRenderSegmentedSticky;

    if (!showComponent) return null;

    return (
        <>
            <StickyMobile articlesToShow={refinedTopThreeArticles} />
            {crtViewTracker(tracked, setTracker)}
        </>
    );
}

CtrNotaV2.label = 'LN-CTR-nota-V2';
CtrNotaV2.defaultProps = {
    customFields: {},
    isAdmin: false
};

CtrNotaV2.propTypes = {
    customFields: PropTypes.shape({
        experimentName: PropTypes.string.tag({
            label: 'Nombre del experimento',
            description: 'Identificador único (ej. "Exp01").',
            defaultValue: '',
            group: SEGMENTATION_GROUP
        }),

        segmentAndHide: PropTypes.boolean.tag({
            label: 'Segmentar y ocultar',
            description:
                'Calcula y persiste el segmento sin renderizar la caja.',
            defaultValue: false,
            group: SEGMENTATION_GROUP
        }),

        testSeparator: PropTypes.label.tag({
            label: '──────── TEST ────────',
            description: 'Configuración de la variante TEST.',
            group: SEGMENTATION_GROUP
        }),

        testDigits: PropTypes.list.tag({
            label: 'Último dígito del Client ID',
            group: SEGMENTATION_GROUP
        }),

        controlSeparator: PropTypes.label.tag({
            label: '──────── CONTROL ────────',
            description: 'Configuración de la variante CONTROL.',
            group: SEGMENTATION_GROUP
        }),

        controlDigits: PropTypes.list.tag({
            label: 'Último dígito del Client ID',
            group: SEGMENTATION_GROUP
        })
    }),
    isAdmin: PropTypes.bool
};

export default CtrNotaV2;
