import React from 'react';
import { useLiveblogAuthors } from './hook/useLiveblogAuthors';
import { scrollToFirstPostOf } from '../../../_helpers/getUniqueAuthorsFromPosts';
import ScrollArea from '../../../../../features/ui-ln/scrollArea/default';
import AuthorButton from './authorButton';

function AuthorBox({ ...r }) {
    const { authors, shouldShow } = useLiveblogAuthors();

    if (!shouldShow) return null;

    return (
        <section data-tw>
            <div
                className="author-box border-y border-solid border-neutral-100 md:border-x md:rounded-8 overflow-hidden py-24 md:shadow-down-lg mb-32 w-[calc(100dvw-32px)] md:w-full"
                {...r}
            >
                <h3 className="text-18 pb-16 md:px-40 prumo prumo-semibold">
                    Autores en vivo ({authors.length})
                </h3>
                <ScrollArea
                    className="max-md:w-[calc(100%+32px)] max-md:-ml-16 max-md:px-16"
                    contentProps={{ className: 'md:px-40' }}
                >
                    {authors.map(author => (
                        <AuthorButton
                            {...author}
                            key={author.id}
                            onClick={() => scrollToFirstPostOf(author.name)}
                        />
                    ))}
                </ScrollArea>
            </div>
        </section>
    );
}

export default AuthorBox;
