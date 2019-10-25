import React from 'react';
import withLastVideosBySection from '../../../common/hocs/withLastVideosBySection';
import LastVideosByProgramComponent from './component';
import filter from '../../../../../content/filters/OTT/homeVideoItem';

const PAGE_SIZE = 12;

const LastVideosByProgram = () => {
    if (!this.props.videos) return <></>;
    return (
        <LastVideosByProgramComponent
            videos={this.props.videos}
            nextPageHandler={this.props.nextPage}
            hasNext={this.props.hasNextPage}
        />
    );
}

export default withLastVideosBySection(
    LastVideosByProgram,
    filter,
    'ott',
    true,
    PAGE_SIZE
);
export const PageSize = PAGE_SIZE;
