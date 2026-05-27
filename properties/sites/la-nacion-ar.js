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
        StoryTelling: 'LN-nota-storytelling',
        StoryTellingV2: 'LN-nota-storytelling-v2',
        Video: 'LN-nota-video',
        HtmlLibre: 'LN-nota-html-libre',
        Infografia: 'LN-nota-infografia',
        Receta: 'LN-nota-receta',
        LiveBlog: 'LN-Nota-Liveblog_Editorial',
        VideoAl100: 'LN-Nota-Video-100',
        Cards: 'LN-Nota-Cards',
        NotaOpinion: 'LN-Nota-Opinion',
        LnBuscador: 'LN-buscador'
    },
    notRecommendedSections: ['recetas']
};
