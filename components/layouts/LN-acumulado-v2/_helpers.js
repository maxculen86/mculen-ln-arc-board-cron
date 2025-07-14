import classNames from 'classnames';
import get from '../../private/common/utils/get';
import isAllowedSection from '../../private/LN/common/utils/isAllowedSection';
import {
    CLASS_ACU_REVISTA,
    revistas,
    getSectionClassName
} from '../LN-acumulado/helpers';

const listOfAllowedSection = [
    { section: '/revista-hola', pageLayout: 'LN-acumulado' },
    { section: '/revista-lugares', pageLayout: 'LN-acumulado' }
];

export function getLayoutClassNames({ globalContent, requestUri, layout }) {
    const sectionStyleName = get(globalContent, 'style.section_style_name', '');
    const sectionClass = getSectionClassName(requestUri);
    const acumuladoColor = get(globalContent, 'acumuladoColor', {});
    const acumuladoGeneral = get(globalContent, 'acumuladoGeneral', {});

    const backgroundCategory = get(acumuladoColor, 'background_color', '');
    const colorTags = get(acumuladoColor, 'navigation_color_tags', '');

    const classRevista = revistas.includes(sectionStyleName)
        ? `${CLASS_ACU_REVISTA} ${sectionStyleName}`
        : '';

    const COLOR_CLASS = backgroundCategory || colorTags ? '--color' : '';
    const OPENING_CLASS = get(acumuladoGeneral, 'id_collection_promo_items')
        ? '--opening'
        : '';

    const classNameWrapper = classNames(
        'wrapper',
        '--top-fixed',
        'acumulado',
        COLOR_CLASS,
        classRevista,
        sectionClass,
        OPENING_CLASS
    );

    const classNameMain = classNames({
        '--header-fixed-margin': !isAllowedSection({
            globalContent,
            listOfAllowedSection,
            layout
        })
    });

    return {
        classNameWrapper,
        classNameMain,
        backgroundCategory
    };
}
