import React, { Component } from 'react'

import { getGenericBoxCustomFields, getArticlesCustomFields } from '../../private/LN/home/common/utils/customFieldsHelper'
import StoriesBox from '../../private/LN/home/common/containers/storiesBox'

const MAX_ARTICLES_COUNT = 6

class Historias extends Component {
  render() {
    const articles = getArticlesCustomFields(MAX_ARTICLES_COUNT, this.props)

    return (
      <>
        {!this.props.customFields.hidden &&
          <StoriesBox articles={articles} />
        }
      </>
    )
  }
}

Historias.propTypes = {
  customFields: getGenericBoxCustomFields(MAX_ARTICLES_COUNT)
}

export default Historias