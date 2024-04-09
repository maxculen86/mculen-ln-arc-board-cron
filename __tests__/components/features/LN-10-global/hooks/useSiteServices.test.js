import { transformResponse } from '../../../../../components/features/LN-10-global/hooks/useSiteServices';

const responseContent = {
    _id: '/',
    _website: 'la-nacion-ar',
    name: 'LA NACION',
    Metarefresh: {
        home_deportes_desktop: '900',
        home_deportes_mobile: '900',
        home_desktop: '600',
        home_mobile: '600',
        nota_desktop: '60',
        nota_mobile: '900'
    },
    Resumen: {
        frequency_penalty: '2',
        max_tokens: '590',
        presence_penalty: '-2',
        prompt:
            "Necesito que me hagas un resumen en bullets estos seran separados por un *, con lo más importante de esta nota que copio a continuación. La idea es que estos puntos que vas a resumir se publiquen dentro de esta nota como un apartado que diga 'Lo qué tenés que saber'. No debería repetir lo que dice la bajada del artículo salvo que sea de suma importancia. Si hay información que está entre comillas o corresponde a algo que dice una persona se debe indicar que eso es una opinión de esa persona en cuestión. El límite de caracteres total debe ser 500 aproximadamente. El resumen debe estar en español de Argentina. No incluyas cifras que no se encuentren dentro de la nota. No incluyas información que no este incluida dentro de la nota. A continuación el contenido a resumir:",
        prompt_max_tokens: '3497',
        temperature: '0'
    },
    Termicas: {
        autoplay: 'true',
        banners: 'true',
        black_button_text: 'Pasate a black',
        bookmark: 'true',
        bookmark_web: 'true',
        button_text: 'Suscribite <span class="--mobile-none">por $400</span>',
        buttonsuscribe: 'true',
        class_tooltip: '--top_l',
        class_upselling_tooltip: '--top_l',
        debug: 'true',
        dolar: 'true',
        dolares: [
            'dbna',
            'dblue',
            'dtarjeta',
            'dturista',
            'dmep',
            'dccl',
            'dmayorista',
            'euro'
        ],
        duo_button_text: 'Pasate a dúo',
        hide_listening_articles: 'false',
        liftigniter: 'true',
        livefyre: 'true',
        mensaje_para_cierre_de_comentarios:
            'Nota cerrada a comentarios custom.',
        paywall: 'true',
        sticky_button_text:
            'Suscribite <span class="--mobile-none">por <del>$4890 </del>$400</span>',
        termica_upselling: 'true',
        tooltip_text: 'Información y análisis <br />para una era de cambios',
        triple_button_text: 'Pasate a triple',
        upselling_tooltip_text: '¡Mejorá tu plan y <br> pagá lo mismo!',
        weather: 'true'
    },
    acumuladoColor: {
        background_color: null,
        header_class_name: 'false',
        id_logo_image: 'QJFKLBWXHVGUFA3O65BIHPFILA',
        navigation_color: null,
        navigation_color_tags: 'Dolar Dolar Dolar Dolar'
    },
    acumuladoGeneral: {
        cantidad_notas: '30',
        colecciones: [],
        hide_banner: 'false',
        hidesectionslist: 'true',
        hidetagslist: 'true',
        hierarchy_navigation: null,
        id_collection_promo_items: null,
        metas: {},
        tipo_acumulado: 'Grilla',
        usa_datalayer: 'true'
    },
    bannerConfig: {
        acumulado_cabezal_dsk: '1260x100,1260x170,728x90,920x170',
        acumulado_cabezal_tab: null,
        acumulado_caja1_dsk: '120x701',
        acumulado_caja1_mob: null,
        acumulado_caja1_tab: null,
        acumulado_caja2_dsk: null,
        acumulado_caja2_mob: null,
        acumulado_caja2_tab: null,
        acumulado_caja3_dsk: null,
        acumulado_caja3_mob: null,
        acumulado_caja4_dsk: null,
        acumulado_caja4_mob: null,
        acumulado_sticky1_mob: null,
        acumulado_sticky2_mob: null,
        dfp_id: '133919216',
        home_1x1_dsk: null,
        home_1x1_mob: null,
        home_adhesion_dsk: '920x101',
        home_adhesion_mob: '320x51',
        home_adhesion_tab: null,
        home_billboard_dsk: null,
        home_cabezal_dsk: null,
        home_cabezal_tab: null,
        home_caja_producto1_dsk: null,
        home_caja_producto2_dsk: null,
        home_caja1_dsk: null,
        home_caja1_mob: null,
        home_caja2_dsk: null,
        home_caja2_mob: null,
        home_caja3_dsk: null,
        home_caja3_mob: null,
        home_caja3_tab: null,
        home_caja4_dsk: null,
        home_caja4_mob: null,
        home_caja4_tab: null,
        home_caja5_mob: null,
        home_caja6_mob: null,
        home_caja7_mob: null,
        home_caja8_mob: null,
        home_caja9_mob: null,
        home_cinturon1_dsk: null,
        home_cinturon2_dsk: null,
        home_cinturon3_dsk: null,
        home_cinturon4_dsk: null,
        home_comercial_dsk: null,
        home_comercial_mob: null,
        home_megalateral_dsk: null,
        home_megalateral2_dsk: null,
        home_megalateral3_dsk: null,
        home_megalateral4_dsk: '300x300',
        home_megalateral5_dsk: null,
        home_megatop_dsk: null,
        home_megatop_tab: null,
        home_middle1_tab: null,
        home_middle2_tab: null,
        home_parallax_dsk: null,
        home_parallax_mob: null,
        home_sticky2_mob: null,
        nota_adhesion_dsk: null,
        nota_adhesion_mob: null,
        nota_adhesion_tab: null,
        nota_cabezal_dsk:
            '1x1,728x90,920x100,920x170,970x90,1260x100,1260x170,2x2',
        nota_cabezal_mob: null,
        nota_cabezal_tab: null,
        nota_caja1_amp: null,
        nota_caja1_dsk: '300x251,300x601',
        nota_caja1_mob: null,
        nota_caja1_tab: null,
        nota_caja2_amp: null,
        nota_caja2_dsk: null,
        nota_caja2_mob:
            '320x50,320x100,300x250,300x450,1x1,360x270,320x180, 360x450, 380x450',
        nota_caja2_tab: null,
        nota_caja3_amp: null,
        nota_caja3_dsk: null,
        nota_caja3_mob: null,
        nota_caja4_dsk: null,
        nota_caja4_mob: null,
        nota_caja5_dsk: null,
        nota_caja5_mob: '320x100,300x250,1x1,fluid',
        nota_megatop_dsk: null,
        nota_megatop_mob: null,
        nota_middle_1_dsk: null,
        nota_middle_2_dsk: null,
        nota_middle_3_dsk: null,
        nota_sticky1_mob: null,
        nota_sticky2_mob: null,
        nota_unoxuno_dsk: null,
        nota_unoxuno_mob: null,
        nota_unoxuno_tab: null
    },
    migration: {
        deadline_livefyre: '2020-02-06',
        id_section_ln9: '0',
        migrated_mob: 'true'
    },
    site: {
        distributor_name: {
            'bbc-mundo': 'BBC Mundo',
            'the-new-york-times': 'The New York Times',
            'el-pais': 'EL PAIS',
            'the-wall-street-journal': 'The Wall Street Journal',
            ovrik: 'Ovrik',
            'chequeado-com': 'chequeado.com',
            'el-comercio-ecuador': 'El Comercio (Ecuador)',
            'europa-press': 'Europa Press',
            alibrate: 'Alibrate',
            'el-comercio-peru': 'El Comercio (Perú)',
            'el-mercurio-chile': 'El Mercurio (Chile)',
            'el-pais-uruguay': 'El País (Uruguay)',
            'el-nacional-venezuela': 'El Nacional (Venezuela)',
            'el-tiempo-colombia': 'El Tiempo (Colombia)',
            'el-universal-mexico': 'El Universal (México)',
            'fast-company': 'Fast Company',
            'the-economist': 'The Economist',
            'the-washington-post': 'The Washington Post',
            'el-tiempo-gda': 'EL TIEMPO/GDA',
            'agencia-tss': 'Agencia TSS',
            'agencia-cyta': 'Agencia CyTA',
            'agencia-sinc': 'Agencia SINC',
            'the-conversation': 'The Conversation',
            ap: 'AP',
            reuters: 'Reuters',
            nexciencia: 'NEXCiencia',
            'mosaic-science': 'Mosaic Science',
            afp: 'AFP',
            ansa: 'ANSA',
            xinhua: 'Xinhua',
            telam: 'Télam',
            espn: 'ESPN',
            DPA: 'DPA'
        },
        link_loading_list: [
            '{ "rel":"dns-prefetch", "href":"//cdn.livefyre.com", "location":"head", "section":"all" }',
            '{ "rel":"dns-prefetch", "href":"https://sb.scorecardresearch.com/", "location":"head", "section":"all" }',
            '{ "rel":"preconnect", "href":"https://www.google-analytics.com", "location":"head", "section":"all" }',
            '{ "rel":"dns-prefetch", "href":"https://static.hotjar.com/", "location":"head", "section":"all" }',
            '{ "rel":"dns-prefetch", "href":"https://c.go-mpulse.net/", "location":"head", "section":"all" }',
            '{ "rel":"preconnect", "href":"https://c.go-mpulse.net/", "location":"head", "section":"all" }',
            '{ "rel":"dns-prefetch", "href":"//ads.rubiconproject.com", "location":"head", "section":"all" }',
            '{ "rel":"dns-prefetch", "href":"//www.googletagservices.com", "location":"head", "section":"all" }',
            '{ "rel":"dns-prefetch", "href":"//cdn.jsdelivr.net", "location":"head", "section":"all" }',
            '{ "rel":"dns-prefetch", "href":"//resizer.glanacion.com/", "location":"head", "section":"all" }',
            '{ "rel":"preconnect", "href":"https://resizer.glanacion.com/", "location":"head", "section":"all" }',
            '{ "rel":"dns-prefetch", "href":"//ingresar.lanacion.com.ar", "location":"head", "section":"all" }',
            '{ "rel":"dns-prefetch", "href":"https://api-ingresar.lanacion.com.ar", "location":"head", "section":"all" }',
            '{ "rel":"dns-prefetch", "href":"//api-paywall.lanacion.com.ar", "location":"head", "section":"all" }',
            '{ "rel":"preconnect", "href":"//api-paywall.lanacion.com.ar", "location":"head", "section":"all" }',
            '{ "rel":"dns-prefetch", "href":"https://stats.g.doubleclick.net/", "location":"head", "section":"all" }',
            '{ "rel":"dns-prefetch", "href":"//especialess3.lanacion.com.ar/", "location":"head", "section":"all" }',
            '{ "rel":"preconnect", "href":"//especialess3.lanacion.com.ar/", "location":"head", "section":"all" }',
            '{ "rel":"preconnect", "href":"https://dev.visualwebsiteoptimizer.com", "location":"head", "section":"nota" }',
            '{ "rel":"dns-prefetch", "href":"https://dev.visualwebsiteoptimizer.com", "location":"head", "section":"nota" }',
            '{ "rel":"preconnect", "href":"https://dev.visualwebsiteoptimizer.com", "location":"head", "section":"home" }',
            '{ "rel":"dns-prefetch", "href":"https://dev.visualwebsiteoptimizer.com", "location":"head", "section":"home" }'
        ],
        script_loading_list: [
            '{     "id": "userClientLibs-home",     "location": "body-bottom",     "section": "home",     "async": true,     "src": "https://static.glanacion.com/v2/registracionclientlibs/userClientLibs-0.1.4-c1213c1.js",     "env": "prod" }',
            '{     "id": "userClientLibs-acu",     "location": "body-bottom",     "section": "acumulado",     "async": true,     "src": "https://static.glanacion.com/v2/registracionclientlibs/userClientLibs-0.1.4-c1213c1.js",     "env": "prod" }',
            '{     "id": "userClientLibs-nota",     "location": "body-bottom",     "section": "nota",     "defer": true,     "src": "https://static.glanacion.com/v2/registracionclientlibs/userClientLibs-0.1.4-c1213c1.js", "crossorigin": "anonymous",     "env": "prod" }',
            '{"id": "SWG-news", "subscriptions-control": "manual", "location": "body-bottom", "section": "nota", "async": true, "src": "https://news.google.com/swg/js/v1/swg.js", "env": "prod"}',
            '{     "id": "SWG-gaa-nota",     "async": true,     "location": "body-bottom",     "section": "nota",     "src": "https://news.google.com/swg/js/v1/swg-gaa.js",     "env": "prod" }',
            '{     "id": "SWG-accounts",     "async": true,     "location": "body-bottom",     "section": "nota",     "src": "https://accounts.google.com/gsi/client",     "env": "prod" }',
            '{     "id": "Gplatform",     "async": true,     "location": "body-bottom",     "section": "nota",     "src": "https://apis.google.com/js/platform.js",     "env": "prod" }',
            '{      "id":"SwgClientLib",      "location":"body-bottom",      "section":"nota",      "defer":true,      "src":"https://static.glanacion.com/v2/registracionclientlibs/swgClientLibs-4.1.0-1f45b86.js",      "crossorigin":"anonymous",      "Access-Control-Allow-Origin":"*.google.com",      "env":"sandbox"   }',
            '{     "id": "meteringjs",     "location": "body-bottom",     "section": "nota",     "defer": true,     "src": "https://qa-static.glanacion.com/v2/metering/metering-qa.js",     "crossorigin": "anonymous",     "validate.content_restrictions.content_code": {         "propName": "metered",         "defaultValue": "comun"     },     "validate.label.showcase.text": {         "propName": "showcase",         "defaultValue": "no"     },     "validate.paywallEnabled": {         "propName": "paywall-enabled",         "defaultValue": "1"     },     "env": "qa" }',
            '{ "async":true,    "location":"head",    "section":"all",    "src":"https://cdn.jsdelivr.net/npm/react-render-tracker" }',
            '{ "id":"blockthrough", "async":true, "location":"body-bottom", "section":"all", "src":"https://btloader.com/tag?o=5698152924446720&upapi=true" }',
            '{"id": "vwoCode", "type":"text/javascript","async": true, "location": "body-bottom", "section": "nota", "src": "resources/js/vwoScript.js", "env": "prod", "addArcVersion": true }',
            '{"id": "vwoCode", "type":"text/javascript","async": true, "location": "body-bottom", "section": "home", "src": "resources/js/vwoScript.js", "env": "prod", "addArcVersion": true }'
        ],
        site_url:
            'https://lanacionar-la-nacion-ar-sandbox.cdn.arcpublishing.com/',
        sitio_adserver: {
            propiedades: 'propiedades',
            campo: 'campo',
            salud: 'bienestar',
            la_nacion_usa: 'la_nacion_usa',
            canchallena: 'canchallena',
            juegos: 'juegos'
        },
        tooltips: {
            Análisis:
                'Interpretación de las noticias basada en evidencia, incluyendo datos y proyecciones posibles en base a eventos pasados.',
            'Contribución de la audiencia':
                'Pedido de información a la audiencia.',
            Explicativo:
                'Provee contexto, definición y detalle de un tópico específico.',
            'Noticia Original':
                'Información basada en hechos y verificada de primera mano por el cronista, o reportada y verificada por fuentes expertas.',
            Opinión:
                'Basada en la interpretación y juicio de hechos y datos realizados por el autor.',
            Review: 'Crítica de un servicio, producto u obra creativa.',
            'Content LAB':
                'Content LAB es la unidad de generación de ideas y contenidos de LA NACION para las marcas con distribución en sus plataformas digitales y redes sociales. Este contenido fue producido para un anunciante y publicado por el Content LAB. La redacción de LA NACION no estuvo involucrada en la generación de este contenido.',
            'Espacio Patrocinado':
                'Brindado por una organización o individuo que ha pagado al proveedor de noticias por este espacio.'
        },
        'with-amp': {
            '1': 'nota-noticia',
            '2': 'nota-infografia',
            '4': 'nota-storytelling',
            '5': 'nota-video',
            '6': 'nota-liveblog',
            '7': 'nota-receta',
            '8': 'nota-foto-al-100'
        }
    },
    social: {
        instagram: null
    },
    tagConfigGroup: {
        anexoinferiortag: {
            'frutas-tid67217':
                'https://especialess3.lanacion.com.ar/21/03/anexo-home-vacunas/ | 198px'
        },
        anexosuperiortag: {
            'frutas-tid67217':
                'https://especialess3.lanacion.com.ar/21/11/anexo-anuario-2021/ | 450px',
            'huev o-tid4 7236':
                'https://especialess3.lanacion.com.ar/20/03/anexo-home-notas/trust/|250px'
        },
        collections_in_tag_page: {
            'la-nacion-cerca':
                'QJ3BOEZVQNEYZEVBXHF4C7KAWY|FPKJS5YHQVFGVD46GOLY7A265U|5HV777MXDBATBJSLKJMZZJFKYM|JYLAMSGRTRBSVEZTT7VHO2WO3U|5HV777MXDBATBJSLKJMZZJFKYM'
        },
        collectiontag: {
            'huevo-tid47236': 'RTSJKCDG3RBMXJ25YBX3NYESWE',
            criptomonedas: 'IZXIYP5PBZEK7GJPTZXOJ4WLIU',
            'mundial-qatar-2022': 'FPKJS5YHQVFGVD46GOLY7A265U'
        },
        wikilist: {
            'lionel-messi-tid1619': '',
            'mundo-boca-tid50218': '',
            'mundo-river-tid50323': '',
            'alberto-fernandez-tid849': '',
            'eduardo-feinmann-tid49817': '',
            'cristina-kirchner-tid988': '',
            'lionel-scaloni-tid65068': '',
            'mundo-independiente-tid62231': '',
            'mundo-racing-tid62230': '',
            'mundo-san-lorenzo-tid62229': '',
            'jonatan-viale-tid55779': '',
            'jonatan-viale': ''
        }
    },
    node_type: 'section',
    children: []
};

describe('useSiteServices', () => {
    it('should return the expected site services data', () => {
        const response = transformResponse(responseContent);
        expect(response).toMatchSnapshot();
    });
});
