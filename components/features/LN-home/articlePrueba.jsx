import React, { Component } from 'react';
import Article from '../../private/LN/home/common/containers/article';
import { buildArticlesCustomFields } from '../../private/common/utils/customFieldsHelper';
import PropTypes from 'fusion:prop-types';

const MAX_ARTICLES_COUNT = 1;

class ArticlePrueba extends Component {
    render() {
        console.log(this.props.customFields);

    return (
      <section className="caja-4notas">
        <Article  id={this.props.customFields.articleId1} 
                  url={this.props.customFields.articleUrl1}
                  position="1"
                  size="M"
                  teaser={this.props.customFields.teaser1} 
                  subheader={this.props.customFields.subheader1}
                  homeTitle={this.props.customFields.homeTitle1}
                  marquee={this.props.customFields.marquee1}
                  articleMark={this.props.customFields.articleMark1}
                  isExclusive={this.props.customFields.isExclusive1}
        />
      </section>
    )
  }

}

const getCustomFields = () => {
    const generalCustomFields = {
        hidden: PropTypes.bool.tag({
            name: 'Ocultar'
        })
    };
    const articlesCustomFields = buildArticlesCustomFields(MAX_ARTICLES_COUNT);
    return PropTypes.shape(
        Object.assign(generalCustomFields, articlesCustomFields)
    );
};

ArticlePrueba.propTypes = {
    customFields: getCustomFields()
};

export default ArticlePrueba;
