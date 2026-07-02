import React from 'react';
import { cx } from '@ln/ds-cva';
import Divider from '../../../../ui/ln/divider/default';

function findSlot(children, displayName) {
    return React.Children.toArray(children).find(
        child =>
            React.isValidElement(child) &&
            child.type?.displayName === displayName
    );
}

function ArticleFooterUiRoot({ children, className }) {
    const authorAndDescription = findSlot(
        children,
        'ArticleFooterUi.AuthorAndDescription'
    );
    const tags = findSlot(children, 'ArticleFooterUi.Tags');
    const brand = findSlot(children, 'ArticleFooterUi.Brand');
    const trustProject = findSlot(children, 'ArticleFooterUi.TheTrustProject');
    const workType = findSlot(children, 'ArticleFooterUi.WorkType');

    const hasAuthorAndDescription = Boolean(
        authorAndDescription?.props.distributor ||
            authorAndDescription?.props.complementaryText
    );
    const hasTags = Boolean(tags?.props.tags?.length);

    return (
        <div data-tw className="contents">
            <div
                className={cx('w-full flex flex-col font-secondary', className)}
            >
                <div className="flex flex-col gap-12 pb-40">
                    {(hasAuthorAndDescription || hasTags) && (
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-40">
                            {authorAndDescription}
                            {tags}
                        </div>
                    )}

                    <Divider />

                    <div className="w-full flex flex-col justify-center md:flex-row md:items-center min-h-20">
                        <div className="w-full flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
                            {brand}
                            <div className="w-full flex flex-col md:flex-row md:items-center gap-8 md:gap-4">
                                {trustProject}
                                {workType}
                            </div>
                        </div>
                    </div>
                </div>

                <Divider color="black" />
            </div>
        </div>
    );
}

ArticleFooterUiRoot.displayName = 'ArticleFooterUi';

export default ArticleFooterUiRoot;
