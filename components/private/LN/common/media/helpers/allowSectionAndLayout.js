import {
    FOTOAL100,
    NOTICIA,
    STORYTELLING
} from '../../../../common/utils/subtypes/subtypeHelper';

const allowSectionAndLayout = [
    { section: '/revista-living', pageLayout: 'LN-acumulado' },
    { section: '/lifestyle', pageLayout: 'LN-acumulado' },
    { section: '/recetas', pageLayout: 'LN-nota-receta' },
    { subtype: NOTICIA },
    { subtype: STORYTELLING },
    { subtype: FOTOAL100 }
];

export default allowSectionAndLayout;
