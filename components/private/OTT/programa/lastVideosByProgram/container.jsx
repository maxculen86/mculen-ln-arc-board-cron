import React from 'react';
import { useContent } from 'fusion:content';
import withLastVideosBySection from '../../../common/hocs/withLastVideosBySection';
import LastVideosByProgramComponent from './component';
import filter from '../../../../../content/filters/OTT/homeVideoItem';

const PAGE_SIZE = 12;

const LastVideosByProgram = props => {
    const { jwVideosformatted = [] } = useContent({
        source:
            (props.globalContent.name && 'ottProgramVideosJwSource') || null,
        query: {
            sectionId: props.globalContent.name
        }
    });

    if (!jwVideosformatted) return <></>;

    return (
        <LastVideosByProgramComponent
            videos={jwVideosformatted}
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
