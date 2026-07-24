const emptyStateUrl = '/foodit/suscribirme?cv=670&fc=826&callback=';

const buttonCategories = {
    DialogFoodit: {
        categoryEvent: 'modal_funcionalidades',
        url: emptyStateUrl
    },
    CommentFoodit: {
        categoryEvent: 'funcionalidad_comentarios',
        url: emptyStateUrl
    },
    SaleBox: {
        categoryEvent: 'home',
        url: '/foodit/suscribirme?cv=670&fc=831&callback='
    },
    HeaderFoodit: {
        categoryEvent: 'header',
        url: '/foodit/suscribirme?callback='
    },
    SignWall: {
        categoryEvent: 'soft-paywall',
        url: '/foodit/suscribirme?cv=800&fc=50000046&callback='
    },
    MyAccount: {
        categoryEvent: 'mi_cuenta',
        url: '/foodit/suscribirme?cv=670&fc=825&callback='
    }
};

const getButtonCategory = comesFrom =>
    buttonCategories[comesFrom] || {
        categoryEvent: 'paginas_exclusivas',
        url: emptyStateUrl
    };

export default getButtonCategory;
