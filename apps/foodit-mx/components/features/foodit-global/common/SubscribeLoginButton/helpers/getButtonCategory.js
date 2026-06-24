const emptyStateUrl = '/suscripcion/V/4/?cv=670&fc=826&callback=';

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
        url: '/suscripcion/V/4/?cv=670&fc=831&callback='
    },
    HeaderFoodit: {
        categoryEvent: 'header',
        url: '/suscripcion/V/3/?callback='
    },
    SignWall: {
        categoryEvent: 'soft-paywall',
        url: '/suscripcion/V/4?cv=800&fc=50000046&callback='
    },
    MyAccount: {
        categoryEvent: 'mi_cuenta',
        url: '/suscripcion/V/3/?cv=670&fc=825&callback='
    }
};

const getButtonCategory = comesFrom =>
    buttonCategories[comesFrom] || {
        categoryEvent: 'paginas_exclusivas',
        url: emptyStateUrl
    };

export default getButtonCategory;
