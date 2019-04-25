'use strict';

import React, { PureComponent } from 'react';
import ArticleComponent from '../components/article';

export default class Picture extends PureComponent {
    render() {
        return <ArticleComponent>{this.props.children}</ArticleComponent>;
    }
}
