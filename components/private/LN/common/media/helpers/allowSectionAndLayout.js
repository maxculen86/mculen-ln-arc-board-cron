import {
    AGENCIA,
    FOTOAL100,
    INFOGRAFIA,
    LIVEBLOG,
    NOTICIA,
    RECETA,
    STORYTELLING,
    VIDEO,
    LIVEBLOG_EDITORIAL
} from '../../../../common/utils/subtypes/subtypeHelper';

const acumuladoLayout = 'LN-acumulado';

const allowSectionAndLayout = [
    { section: '/data', pageLayout: acumuladoLayout },
    { section: '/revista-living', pageLayout: acumuladoLayout },
    { section: '/lifestyle', pageLayout: acumuladoLayout },
    { section: '/turismo', pageLayout: acumuladoLayout },
    { section: '/tecnologia', pageLayout: acumuladoLayout },
    { section: '/moda-y-belleza', pageLayout: acumuladoLayout },
    { section: '/el-mundo', pageLayout: acumuladoLayout },
    { section: '/buenos-aires', pageLayout: acumuladoLayout },
    { section: '/seguridad', pageLayout: acumuladoLayout },
    { section: '/educacion', pageLayout: acumuladoLayout },
    { section: '/sociedad', pageLayout: acumuladoLayout },
    { section: '/espectaculos', pageLayout: acumuladoLayout },
    { section: '/cultura', pageLayout: acumuladoLayout },
    { section: '/comunidad', pageLayout: acumuladoLayout },
    { section: '/ciencia', pageLayout: acumuladoLayout },
    { section: '/revista-hola', pageLayout: acumuladoLayout },
    { section: '/revista-lugares', pageLayout: acumuladoLayout },
    { section: '/revista-jardin', pageLayout: acumuladoLayout },
    { section: '/recetas', pageLayout: 'LN-nota-receta' },
    { subtype: NOTICIA },
    { subtype: VIDEO },
    { subtype: STORYTELLING },
    { subtype: FOTOAL100 },
    { subtype: AGENCIA },
    { subtype: RECETA },
    { subtype: LIVEBLOG },
    { subtype: INFOGRAFIA },
    { subtype: LIVEBLOG_EDITORIAL }
];

export default allowSectionAndLayout;
