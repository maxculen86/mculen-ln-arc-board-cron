import React from 'react';
import withLastVideosBySection from '../../../common/hocs/withLastVideosBySection';
import LastVideosByProgramComponent from './component';
import filter from '../../../../../content/filters/OTT/homeVideoItem';

const PAGE_SIZE = 12;

const LastVideosByProgram = props => {
    if (!props.videos) return <></>;
    return (
        <LastVideosByProgramComponent
            videos={props.videos}
            nextPageHandler={props.nextPage}
            hasNext={props.hasNextPage}
            programName={props.globalContent && props.globalContent.name}
        />
    );
};

export default withLastVideosBySection(
    LastVideosByProgram,
    filter,
    'ott',
    true,
    PAGE_SIZE
);
export const PageSize = PAGE_SIZE;
