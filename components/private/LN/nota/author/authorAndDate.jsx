import React, { useState } from 'react';
import ModDate from '../../../common/mod-date';
import Author from './authorArticle';

const authorAndDate = props => {
    const { globalContent, author, date, authorDate } = props;
    const {
        display_date: displayDate,
        credits,
        label,
        first_publish_date: firstPublishDate,
        last_updated_date: lastUpdatedDate
    } = globalContent || {};
    const { edicion: labelEdicionImpresa } = label || {};
    const [visible, setVisible] = useState(false);

    if (!visible && 'by' in credits) {
        const by = credits.by.filter(auth => auth.type === 'author');
        if (by.length > 0) setVisible(true);
    }

    if (!visible && !displayDate) return null;
    return (
        <>
            {date && (
                <ModDate
                    display_date={displayDate}
                    labelEdicionImpresa={labelEdicionImpresa}
                    first_publish_date={firstPublishDate}
                    last_updated_date={lastUpdatedDate}
                />
            )}
            {author && (
                <div className="col-12">
                    <div className="col-12">
                        <div className="com-author">
                            <Author {...props} />
                        </div>
                    </div>
                </div>
            )}
            {authorDate && (
                <>
                    {/* <Date
                        labelEdicionImpresa={labelEdicionImpresa}
                        display_date={display_date}
                    /> */}
                    <ModDate
                        display_date={displayDate}
                        labelEdicionImpresa={labelEdicionImpresa}
                    />
                    <div className="com-author">
                        <Author {...props} />
                    </div>
                </>
            )}
        </>
    );
};

export default authorAndDate;
