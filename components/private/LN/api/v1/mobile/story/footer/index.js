import get from '../../../../../../common/utils/get';
import { authorCommon as Author } from '../../../../common/elements/author';
import getDistributor from '../../../../common/elements/distributor';
import { getZocaloAppsProps } from '../../../../../../../features/LN-nota/infoBox/helper';

const EXCLUDED_DISTRIBUTORS = ['lanacionar', 'LA NACION'];
const buildFooter = article => {
    const footer = article.footer || [];

    const articleAuthors = get(article, 'credits.by', null);
    const authorsOnly =
        articleAuthors && articleAuthors.filter(a => a.type === 'author');
    if (authorsOnly && authorsOnly.length > 0) {
        const authors = authorsOnly.map(a => Author(a));
        footer.push({ _t: 'authors', authors });
    }

    const distributor = getDistributor(article, false);
    if (distributor && !EXCLUDED_DISTRIBUTORS.includes(distributor.name)) {
        footer.push({ _t: 'distributor', distributor });
    }

    const trust = get(article, 'label.trust.text', null);
    let isTrust;
    if (trust) {
        isTrust = /nomostrartrust/.test(
            trust.toLowerCase().replace(/ /g, '').trim()
        );
    }
    if (!isTrust) footer.push({ _t: 'trust' });

    const path = get(article, 'taxonomy.primary_section.path', null);
    const zocalo = getZocaloAppsProps(path);
    if (zocalo) {
        footer.push({ ...zocalo });
    }

    return footer.length > 0 ? footer : null;
};

export default buildFooter;
