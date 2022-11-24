import ScriptManager from '../../../common/scriptManager';
import AmazonPublisherServices from '../../../common/scriptManager/amazonPublisherServices';
import Blockthrough from '../../../common/scriptManager/blockthrough';
import Comscore from '../../../common/scriptManager/comscore';
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
import { pipe } from '../../../common/utils/functional';

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
        feature: ['LN-acumulado/cajaDolar', 'LN-acumulado/cajaCripto']
    },
    { component: { name: 'GTM', function: GTM }, feature: 'none' },
    { component: { name: 'Comscore', function: Comscore }, feature: 'none' },
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
    }
];

const getPageBuilderFeatures = _renderables =>
    _renderables.filter(renderable => renderable.collection === 'features');

const getScriptsFilterFunction = scripts => features =>
    scripts
        .filter(
            script =>
                features.find(feature =>
                    script.feature.includes(feature.type)
                ) !== undefined || script.feature === 'none'
        )
        .map(element => element.component)
        .reduce(
            (accumulator, value) => ({
                ...accumulator,
                [value.name]: value.function
            }),
            {}
        );

export const getScriptsToLoad = (renderables = []) => {
    return pipe(
        getPageBuilderFeatures,
        getScriptsFilterFunction(scriptList)
    )(renderables);
};

const buildScriptComponent = (
    renderables = [],
    sitePropertiesScripts = [],
    globalContent = {}
) => {
    return ScriptManager(
        getScriptsToLoad(renderables),
        sitePropertiesScripts,
        globalContent
    );
};

export default buildScriptComponent;
