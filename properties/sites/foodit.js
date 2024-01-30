import imageConfig from './helperConfigFoodit/imageConfig';
import scripts from './helperConfigFoodit/scriptConfig';

// TODO: Base de propiedades del sitio RECETAS, mientras tanto usa el mismo imageConfig de LN, queda pendiente armar nuevas configuraciones de ser necesario. El titulo y descripcion son de ejemplo.
// TODO: host deberia ser url productiva, de momento utilizo url sandbox
export default {
    longTitle: 'Foodit, recetas faciles y rapidas.',
    title: 'FOODIT',
    description:
        'FOODIT ofrece una inmensa variedad de recetas, que permiten planificar las comidas de la semana',
    imageConfig,
    scripts,
    loggerExcludedErrors: [404, 301, 302],
    host: 'https://lanacionar-foodit-sandbox.web.arc-cdn.net/',
    layoutsName: {
        FooditHome: 'Foodit-home',
        FooditFichaReceta: 'Foodit-ficha-receta',
        FooditFichaNota: 'Foodit-ficha-nota',
        FooditRecetario: 'Foodit-recetario',
        FooditAcumulado: 'Foodit-acumulado'
    }
};
