'use strict';

import React, { PureComponent } from 'react';
import ArticleComponent from './component';

export default class Picture extends PureComponent {
    render() {
        return <ArticleComponent>{this.props.children}</ArticleComponent>;
    }
}
