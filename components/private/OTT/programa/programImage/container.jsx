import React, { PureComponent } from 'react';
import get from '../../../common/utils/get';
import WithImage from '../../../../private/common/hocs/withImage';
import ImageComponent from './component';

class ProgramImageContainer extends PureComponent {
    render() {
        const url = get(this.props.image, 'url', null);
        return <ImageComponent imgSrc={url} {...this.props} />;
    }
}

export default WithImage(ProgramImageContainer, null, true);
