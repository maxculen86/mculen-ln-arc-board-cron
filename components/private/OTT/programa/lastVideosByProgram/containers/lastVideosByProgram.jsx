import React, { PureComponent } from 'react';
import getLastVideosBySection from '../../../../common/hocs/getLastVideosBySection';
import LastVideosByProgramComponent from '../components/lastVideosByProgram';
import get from 'lodash.get';
import filter from '../../../../../../content/filters/OTT/homeVideoItem';

const PAGE_SIZE = 12;

class LastVideosByProgram extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.videos) return <></>;
        return (
            <LastVideosByProgramComponent
                videos={this.props.videos}
                nextPageHandler={this.props.nextPage}
                hasNext={this.props.hasNextPage}
            />
        );
    }
}

export default getLastVideosBySection(
    LastVideosByProgram,
    filter,
    'ott',
    true,
    PAGE_SIZE
);
export const pageSize = PAGE_SIZE;
