import {
    FOTOAL100,
    STORYTELLING
} from '../../../../common/utils/subtypes/subtypeHelper';

const allowSectionAndLayout = [
    { section: '/revista-living', pageLayout: 'LN-acumulado' },
    { section: '/lifestyle', pageLayout: 'LN-acumulado' },
    { section: '/recetas', pageLayout: 'LN-nota-receta' },
    { subtype: STORYTELLING },
    { subtype: FOTOAL100 }
];

export default allowSectionAndLayout;
