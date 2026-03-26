import React from 'react';
import { cx } from '@ln/cva';
import { Text } from '@ln/contenidos-ui-text';
import SignatureWithAuthors from '../../../../features/LN-nota/signature/signatureWithAuthors';

function PostAuthor({ dataAuthor }) {
    const { shouldShowRole, role, ...authorProps } = dataAuthor;
    if (shouldShowRole)
        return (
            <div className="flex flex-column flex-row_m gap-8_m ai-center_m pb-16">
                <SignatureWithAuthors withAuthorRole {...authorProps} />
                <div className="separator w-2 h-16 bg-light-400 sm-none mb-4" />
                <Text
                    as="p"
                    className={cx(
                        'text-14 text-neutral-light-600 pb-4 ml-8 ml-0_m',
                        authorProps.photo &&
                            authorProps.photo !== '' &&
                            'pl-40 px-0_m'
                    )}
                >
                    {role}
                </Text>
            </div>
        );
    return <SignatureWithAuthors {...dataAuthor} className="pb-16" />;
}

export default PostAuthor;
