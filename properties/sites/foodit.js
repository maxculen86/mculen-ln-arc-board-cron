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
        FooditHome: 'Foodit-home',
        FooditFichaReceta: 'Foodit-ficha-receta',
        FooditFichaNota: 'Foodit-ficha-nota',
        FooditRecetario: 'Foodit-recetario',
        FooditAcumulado: 'Foodit-acumulado',
        FooditListadoCompras: 'Foodit-compras',
        FooditAcumuladoChef: 'Foodit-acumulado-chef',
        FooditChef: 'Foodit-chef',
        Foodit404: 'Foodit-404',
        FooditRecipePaywall: 'Foodit-recipe-paywall',
        FooditNotePaywall: 'Foodit-note-paywall',
        FooditBuscador: 'Foodit-buscador',
        FooditChatIA: 'Foodit-chat-ia',
        FooditMenuSemanal: 'Foodit-menu-semanal',
        FooditSubcategorias: 'Foodit-subcategorias'
    }
};
