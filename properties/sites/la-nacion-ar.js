import imageConfig from './helperConfigLN/imageConfig';
import bannerConfig from './helperConfigLN/bannerConfig';
import cajaTemaConfig from './helperConfigLN/cajaTemaConfig';
import scripts from './helperConfigLN/scriptsConfig';

export default {
    longTitle: 'Últimas noticias de Argentina y el mundo - LA NACION',
    title: 'LA NACION',
    description:
        'LA NACION ofrece las últimas noticias, fotos y videos de la Argentina y el mundo. Política, economía, deportes y toda la información en tiempo real.',
    className: {
        body: 'ln'
    },
    host: 'https://www.lanacion.com.ar',
    loggerExcludedErrors: [404, 301, 302],
    scripts,
    imageConfig,
    bannerConfig,
    shareConfig: {
        facebook: {
            appID: '154042854349421'
        }
    },
    firebase: {
        apiKey: 'AIzaSyCFxG5eKZiyU1DDlg7yZw4JzblfO6pc0m4',
        authDomain: 'lanacion-92a91.firebaseapp.com',
        databaseURL: 'https://lanacion-92a91.firebaseio.com',
        messagingSenderId: '221085116662',
        projectId: 'lanacion-92a91',
        storageBucket: 'lanacion-92a91.appspot.com'
    },
    loginUrl: '//qa-ingresar.lanacion.com.ar/ingresar/D/1/?callback=',
    logoutUrl: '/logout.html',
    lifigniter: {
        clientId: '8561ps8ov66e7mim'
    },
    sliderConfig: [
        {
            name: 'default',
            lowerRange: null,
            topRange: null,
            pageSize: 1
        }
    ],
    optaConfig: {
        subscription_id: '2f9d4a3fdc61653e686a4be85a25e1ac',
        language: 'es_CO',
        timezone: 'America/Buenos_Aires'
    },
    cajaTemaConfig,
    layoutsName: {
        Acumulado: 'LN-acumulado',
        Columnistas: 'LN-acumulado-columnistas',
        Deportes: 'LN-Home_Sports',
        FotoAl100: 'LN-nota-foto-al-100',
        Home: 'LN-Home_Main',
        HomeLN10: 'LN10-Home_Main',
        Noticia: 'LN-nota-noticia',
        OttFicha: 'OTT-ficha',
        StoryTelling: 'LN-nota-storytelling',
        Video: 'LN-nota-video',
        HtmlLibre: 'LN-nota-html-libre',
        Infografia: 'LN-nota-infografia'
    },
    notRecommendedSections: ['recetas']
};
