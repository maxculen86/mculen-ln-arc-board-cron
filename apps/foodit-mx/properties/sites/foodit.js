import imageConfig from './helperConfigFoodit/imageConfig';
import scripts from './helperConfigFoodit/scriptConfig';

export default {
    longTitle: 'Foodit, recetas faciles y rapidas.',
    title: 'FOODIT',
    description:
        'FOODIT ofrece una inmensa variedad de recetas, que permiten planificar las comidas de la semana',
    imageConfig,
    shareConfig: {
        facebook: {
            appID: '154042854349421'
        }
    },
    scripts,
    loggerExcludedErrors: [404, 301, 302],
    host: 'https://foodit.lanacion.com.ar/',
    layoutsName: {
        FooditFichaReceta: 'Foodit-ficha-receta',
        FooditAcumulado: 'Foodit-acumulado'
    }
};
