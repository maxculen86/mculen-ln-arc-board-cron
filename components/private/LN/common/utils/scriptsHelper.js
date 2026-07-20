import ScriptManager from '../../../common/scriptManager';
import AmazonPublisherServices from '../../../common/scriptManager/amazonPublisherServices';
import Blockthrough from '../../../common/scriptManager/blockthrough';
import Comscore from '../../../common/scriptManager/comscore';
import ComscoreFoodit from '../../../common/scriptManager/comscoreFoodit';
import ComscoreVideo from '../../../common/scriptManager/comscoreVideo';
import Datadog from '../../../common/scriptManager/dataDog';
import GooglePublisherTag from '../../../common/scriptManager/googlePublisherTag';
import GooglePublisherTagAcumulado from '../../../common/scriptManager/googlePublisherTagAcumulado';
import GTM from '../../../common/scriptManager/googleTagManager';
import LiftIgniter from '../../../common/scriptManager/Liftigniter';
import Microdata from '../../../common/scriptManager/microdata';
import OptaEmbed from '../../../common/scriptManager/optaEmbed';
import Petametrics from '../../../common/scriptManager/petametrics';
import PostBid from '../../../common/scriptManager/postbid';
import ScriptHtmlLibre from '../../../common/scriptManager/scriptHtmlLibre';
import SocialEmbeds from '../../../common/scriptManager/socialEmbeds';
import DevReactTracker from '../../../common/scriptManager/DevReactTracker';
import AdblockDetector from '../../../common/scriptManager/adblockDetector';
import ScriptCripto from '../../../common/scriptManager/scriptCripto';
import Permutive from '../../../common/scriptManager/Permutive';
import Marfeel from '../../../common/scriptManager/Marfeel';
import ScriptDataModal from '../../../common/scriptManager/scriptDataModal';
import Observable from '../../../../output-types/Helper/observable';
import FooditEventsHelper from '../../../common/scriptManager/FooditEventsHelper';
import ScriptJwVideoHome from '../../../common/scriptManager/ScriptJwVideoHome';
import YouTubeVideoTrackingScript from '../../../common/scriptManager/YouTubeVideoTrackingScript';
import DsPromoEventsScript from '../../../common/scriptManager/DsPromoEventsScript';

import { pipe } from '../../../common/utils/functional';
import EventsHelpers from './EventsHelpers';
import get from '../../../common/utils/get';
import MetaRobots from '../../../common/scriptManager/MetaRobots';
import TikTokPixel from '../../../common/scriptManager/TikTokPixel';
import FacebookPixel from '../../../common/scriptManager/FacebookPixel';
import GoogleOneTap from '../../../common/scriptManager/GoogleOneTap';

export const YOUTUBE_VIDEO_TRACKING_LAYOUTS = ['LN10-Home_Main'];

const scriptList = [
    {
        component: { name: 'Datadog', function: Datadog },
        feature: 'none'
    },
    {
        component: { name: 'AdblockDetector', function: AdblockDetector },
        feature: 'none'
    },
    {
        component: { name: 'ScriptCripto', function: ScriptCripto },
        feature: ['LN-acumulado/CrypoCarrousel', 'LN-acumulado/cajaCripto']
    },
    {
        component: { name: 'Permutive', function: Permutive },
        feature: 'none'
    },
    {
        component: { name: 'GTM', function: GTM },
        feature: 'none',
        excludedLayouts: ['Error']
    },
    { component: { name: 'Comscore', function: Comscore }, feature: 'none' },
    {
        component: { name: 'ComscoreFoodit', function: ComscoreFoodit },
        feature: 'none'
    },
    { component: { name: 'Microdata', function: Microdata }, feature: 'none' },
    {
        component: { name: 'PostBid', function: PostBid },
        feature: 'none'
    },
    {
        component: { name: 'GooglePublisherTag', function: GooglePublisherTag },
        feature: 'none'
    },
    {
        component: {
            name: 'GooglePublisherTagAcumulado',
            function: GooglePublisherTagAcumulado
        },
        feature: 'none'
    },
    {
        component: { name: 'LiftIgniter', function: LiftIgniter },
        feature: ['LN-nota/tePuedeInteresar']
    },
    {
        component: { name: 'Petametrics', function: Petametrics },
        feature: ['LN-nota/tePuedeInteresar']
    },
    {
        component: { name: 'SocialEmbeds', function: SocialEmbeds },
        feature: 'none'
    },
    {
        component: { name: 'OptaEmbed', function: OptaEmbed },
        feature: 'none'
    },
    {
        component: { name: 'ScriptHtmlLibre', function: ScriptHtmlLibre },
        feature: 'none'
    },
    {
        component: { name: 'Blockthrough', function: Blockthrough },
        feature: 'none'
    },
    {
        component: {
            name: 'AmazonPublisherServices',
            function: AmazonPublisherServices
        },
        feature: 'none'
    },
    {
        component: {
            name: 'ComscoreVideo',
            function: ComscoreVideo
        },
        feature: 'none'
    },
    {
        component: {
            name: 'DevReactTracker',
            function: DevReactTracker
        },
        feature: 'none'
    },
    {
        component: { name: 'Marfeel', function: Marfeel },
        feature: 'none',
        excludedLayouts: ['Error']
    },
    {
        component: { name: 'Observable', function: Observable },
        feature: 'none'
    },
    {
        component: { name: 'DataModal', function: ScriptDataModal },
        feature: 'none'
    },
    {
        component: {
            name: 'FooditEventsHelper',
            function: FooditEventsHelper
        },
        feature: 'none'
    },
    {
        component: { name: 'EventsHelper', function: EventsHelpers },
        feature: 'none'
    },
    {
        component: { name: 'ScriptJwVideoHome', function: ScriptJwVideoHome },
        feature: ['LN-10/videoPlayer', 'LN-10/videoPlayerNota']
    },
    {
        component: {
            name: 'YouTubeVideoTrackingScript',
            function: YouTubeVideoTrackingScript
        },
        feature: 'none',
        includedLayouts: YOUTUBE_VIDEO_TRACKING_LAYOUTS
    },
    {
        component: { name: 'DsPromoEvents', function: DsPromoEventsScript },
        feature: ['LN/DS-CardPromo']
    },
    {
        component: { name: 'TikTokPixel', function: TikTokPixel },
        feature: 'none'
    },
    {
        component: { name: 'FacebookPixel', function: FacebookPixel },
        feature: 'none'
    },
    {
        component: { name: 'GoogleOneTap', function: GoogleOneTap },
        feature: 'none'
    }
];

const getPageBuilderFeatures = _renderables =>
    _renderables.filter(renderable => renderable.collection === 'features');

const isGPTAndDisabled = (script, bannersDisabled) =>
    bannersDisabled && script.component.name === 'GooglePublisherTag';

export const shouldExcludeByLayout = (script, layout) =>
    !!script.excludedLayouts?.includes(layout);

export const shouldIncludeByLayout = (script, layout) =>
    !script.includedLayouts || script.includedLayouts.includes(layout);

const getScriptsFilterFunction =
    (scripts, bannersDisabled, layout) => features => {
        const filteredScripts = scripts
            .filter(script => {
                if (
                    shouldExcludeByLayout(script, layout) ||
                    !shouldIncludeByLayout(script, layout)
                )
                    return false;

                return (
                    (script.feature === 'none' ||
                        features.find(feature =>
                            script.feature.includes(feature.type)
                        ) !== undefined) &&
                    !isGPTAndDisabled(script, bannersDisabled)
                );
            })
            .map(element => element.component)
            .reduce(
                (accumulator, value) => ({
                    ...accumulator,
                    [value.name]: value.function
                }),
                {}
            );

        if (bannersDisabled) {
            filteredScripts.MetaRobots = MetaRobots;
        }

        return filteredScripts;
    };

export const getScriptsToLoad = (
    bannersDisabled,
    renderables = [],
    layout = ''
) =>
    pipe(
        getPageBuilderFeatures,
        getScriptsFilterFunction(scriptList, bannersDisabled, layout)
    )(renderables);

const buildScriptComponent = ({
    renderables = [],
    sitePropertiesScripts = [],
    globalContent = {},
    globalContentConfig = {},
    isArcPreview = false,
    layout = ''
}) => {
    const bannersDisabled = /tests-bannerdisabled\//.test(
        get(globalContentConfig, 'query.url', '')
    );

    return ScriptManager(
        getScriptsToLoad(bannersDisabled, renderables, layout),
        sitePropertiesScripts,
        globalContent,
        isArcPreview
    );
};

export default buildScriptComponent;
