import ScriptManager from '../../../common/scriptManager';
import AmazonPublisherServices from '../../../common/scriptManager/amazonPublisherServices';
import Blockthrough from '../../../common/scriptManager/blockthrough';
import Comscore from '../../../common/scriptManager/comscore';
import comscoreVideo from '../../../common/scriptManager/comscoreVideo';
import DataDog from '../../../common/scriptManager/dataDog';
import GooglePublisherTag from '../../../common/scriptManager/googlePublisherTag';
import googlePublisherTagAcumulado from '../../../common/scriptManager/googlePublisherTagAcumulado';
import GTM from '../../../common/scriptManager/googleTagManager';
import LiftIgniter from '../../../common/scriptManager/Liftigniter';
import Microdata from '../../../common/scriptManager/microdata';
import optaEmbed from '../../../common/scriptManager/optaEmbed';
import Petametrics from '../../../common/scriptManager/petametrics';
import PostBid from '../../../common/scriptManager/postbid';
import scriptHtmlLibre from '../../../common/scriptManager/scriptHtmlLibre';
import ScriptVideoPowa from '../../../common/scriptManager/scriptVideoPowa';
import socialEmbeds from '../../../common/scriptManager/socialEmbeds';
import { pipe } from '../../../common/utils/functional';

const scriptList = [
    {
        component: { name: 'Datadog', function: DataDog },
        feature: 'none'
    },
    {
        component: { name: 'ScriptVideoPowa', function: ScriptVideoPowa },
        feature: 'none'
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
            function: googlePublisherTagAcumulado
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
        component: { name: 'SocialEmbeds', function: socialEmbeds },
        feature: 'none'
    },
    {
        component: { name: 'OptaEmbed', function: optaEmbed },
        feature: 'none'
    },
    {
        component: { name: 'ScriptHtmlLibre', function: scriptHtmlLibre },
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
            function: comscoreVideo
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
