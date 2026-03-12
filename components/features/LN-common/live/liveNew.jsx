import React from 'react';
import { cx } from '@ln/cva';
import LiveSection from './componentes/LiveSection';
import LiveBody from './componentes/LiveBody';
import LiveNotes from './componentes/LiveNotes';
import LiveNote from './componentes/LiveNote';
import LiveTopics from './componentes/LiveTopics';
import LiveTopic from './componentes/LiveTopic';

function LiveNew({ children = null, badgeType = '', className = '', ...r }) {
    const _classnames = cx(
        'ln-live flex mb-16 border border-bottom border-thin border-neutral-light-100',
        className,
        { [`--${badgeType}`]: badgeType }
    );

    return (
        <div className={_classnames} {...r}>
            {children}
        </div>
    );
}

LiveNew.Section = LiveSection;
LiveNew.Body = LiveBody;
LiveNew.Notes = LiveNotes;
LiveNew.Note = LiveNote;
LiveNew.Topics = LiveTopics;
LiveNew.Topic = LiveTopic;

export default LiveNew;
