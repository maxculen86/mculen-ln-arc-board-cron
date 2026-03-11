import React from 'react';
import { Text } from '@ln/contenidos-ui-text';
import PostAuthor from './PostAuthor';

function PostHeader({ displayTime, date, title, dataAuthor, children }) {
    return (
        <div className="flex flex-column pt-32 px-16 px-40_m">
            <div className="row ai-center text-14 gap-8 flex jc-between mb-16">
                <div className="flex gap-8 ai-center">
                    {displayTime && (
                        <time className="text-danger-600 font-bold">
                            {displayTime}
                        </time>
                    )}
                    {date && (
                        <>
                            <div className="separator w-2 h-30 bg-light-400" />
                            <time className="text-neutral-light-600">
                                {date}
                            </time>
                        </>
                    )}
                </div>
                {children}
            </div>
            {title && (
                <Text
                    className="prumo prumo-semibold text-24 text-neutral-light-800 mb-16"
                    as="h2"
                >
                    {title}
                </Text>
            )}
            <PostAuthor dataAuthor={dataAuthor} />
        </div>
    );
}

export default PostHeader;
