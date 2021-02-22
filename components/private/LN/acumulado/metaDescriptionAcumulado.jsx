import React from 'react';
import PropTypes from 'fusion:prop-types';
import WithAcuArticlesData from '../common/hocs/WithAcuArticlesData';
import filter from '../../../../content/filters/LN/acumulado/articleAcuTitles';
import getTitleText from '../../common/utils/getTitleText';

const MetaDescriptionAcumulado = ({ articles = [], title }) => {
    const customTitle =
        title === 'Últimas noticias'
            ? 'del día de hoy en Argentina'
            : `de ${title}`;
    const firstPart = `Últimas Noticias ${customTitle}`;
    const withDots = articles && articles.length > 0 ? ':' : '';
    const articlesTitles = articles.map(
        art => ` ${getTitleText(art.headlines)}`
    );
    const description = `${firstPart}${withDots}${articlesTitles.join(',')}`;
    return <meta name="description" content={`${description} - LA NACION`} />;
};

MetaDescriptionAcumulado.propTypes = {
    articles: PropTypes.arrayOf(PropTypes.object).isRequired,
    title: PropTypes.string.isRequired
};

export default WithAcuArticlesData(MetaDescriptionAcumulado, filter);
