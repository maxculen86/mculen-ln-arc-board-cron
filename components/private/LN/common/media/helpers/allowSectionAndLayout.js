import {
    AGENCIA,
    FOTOAL100,
    NOTICIA,
    RECETA,
    STORYTELLING,
    VIDEO
} from '../../../../common/utils/subtypes/subtypeHelper';

const allowSectionAndLayout = [
    { section: '/data', pageLayout: 'LN-acumulado' },
    { section: '/revista-living', pageLayout: 'LN-acumulado' },
    { section: '/lifestyle', pageLayout: 'LN-acumulado' },
    { section: '/turismo', pageLayout: 'LN-acumulado' },
    { section: '/tecnologia', pageLayout: 'LN-acumulado' },
    { section: '/moda-y-belleza', pageLayout: 'LN-acumulado' },
    { section: '/el-mundo', pageLayout: 'LN-acumulado' },
    { section: '/buenos-aires', pageLayout: 'LN-acumulado' },
    { section: '/seguridad', pageLayout: 'LN-acumulado' },
    { section: '/educacion', pageLayout: 'LN-acumulado' },
    { section: '/sociedad', pageLayout: 'LN-acumulado' },
    { section: '/espectaculos', pageLayout: 'LN-acumulado' },
    { section: '/cultura', pageLayout: 'LN-acumulado' },
    { section: '/comunidad', pageLayout: 'LN-acumulado' },
    { section: '/ciencia', pageLayout: 'LN-acumulado' },
    { section: '/revista-hola', pageLayout: 'LN-acumulado' },
    { section: '/revista-lugares', pageLayout: 'LN-acumulado' },
    { section: '/revista-jardin', pageLayout: 'LN-acumulado' },
    { section: '/recetas', pageLayout: 'LN-nota-receta' },
    { subtype: NOTICIA },
    { subtype: VIDEO },
    { subtype: STORYTELLING },
    { subtype: FOTOAL100 },
    { subtype: AGENCIA },
    { subtype: RECETA }
];

export default allowSectionAndLayout;
