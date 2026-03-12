import React from 'react';
import { Badge } from '@ln/contenidos-ui-badge';
import { typeBadge } from '../../LN-10/article/common/_helper-WebApi';
import LiveNew from './liveNew';

function Updates({ section = '', chapita = '', updates = [], chapitaStyle }) {
    return (
        <LiveNew data-testid="live-component">
            <LiveNew.Section section={section}>
                <div className="live-notes relative w-100 overflow-hidden">
                    <LiveNew.Body>
                        {chapita && (
                            <Badge
                                className="ai-center mr-8"
                                type={typeBadge[chapitaStyle]}
                                text={chapita}
                            />
                        )}
                        {updates.length !== 0 ? (
                            <LiveNew.Notes>
                                {updates.map(update => (
                                    <LiveNew.Note
                                        key={update.title}
                                        url={update.link}
                                        title={update.title}
                                    >
                                        {update.title}
                                    </LiveNew.Note>
                                ))}
                            </LiveNew.Notes>
                        ) : null}
                    </LiveNew.Body>
                </div>
            </LiveNew.Section>
        </LiveNew>
    );
}

export default Updates;
