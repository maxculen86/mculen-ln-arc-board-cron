import React, { PureComponent } from 'react';
import WithImage from '../../../../private/common/hocs/withImage';
import ImageComponent from './component';
import get from 'lodash.get';

class ProgramImageContainer extends PureComponent {
    render() {
        if (!this.props.image) return null;

        console.log('image', this.props.image);
        const url = get(this.props.image, 'url', null);
        console.log('url', url);
        return <ImageComponent imgSrc={url} />;
    }
}

export default WithImage(ProgramImageContainer, null, true);
