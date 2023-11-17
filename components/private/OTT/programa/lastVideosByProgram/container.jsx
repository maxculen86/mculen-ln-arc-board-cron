import React from 'react';
import withLastVideosBySection from '../../../common/hocs/withLastVideosBySection';
import LastVideosByProgramComponent from './component';

const LastVideosByProgram = props => {
    return (
        <LastVideosByProgramComponent
            videos={props.videos}
            nextPageHandler={props.nextPage}
            hasNext={props.hasNextPage}
            programName={props.globalContent && props.globalContent.name}
        />
    );
};

export default withLastVideosBySection(LastVideosByProgram);
