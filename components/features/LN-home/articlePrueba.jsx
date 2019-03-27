import React, { Component } from 'react'
import Article from '../../private/LN/home/common/containers/article'
import { buildArticlesCustomFields, getArticlesCustomFields } from '../../private/common/utils/customFieldsHelper'
import PropTypes from 'prop-types'

const MAX_ARTICLES_COUNT = 1

class ArticlePrueba extends Component {
  render() {
    return (
      <div>
        <Article />
      </div>
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
  return PropTypes.shape(Object.assign(generalCustomFields, articlesCustomFields));
}

ArticlePrueba.propTypes = {
    customFields: getCustomFields()
}

export default ArticlePrueba