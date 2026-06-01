import React from 'react';
import SearchContextProvider from './SearchContext';
import FilterBox from './FilterBox';
import ArticlesGrid from './ArticlesGrid';
import FilterDrawer from './FilterDrawer';

const DRAWER_ID = 'ln-search-filters';

function Search() {
    return (
        <SearchContextProvider>
            <div data-tw style={{ display: 'contents' }}>
                <FilterDrawer drawerId={DRAWER_ID} />
                <section
                    aria-label="Buscador"
                    className="grid grid-cols-8 md:grid-cols-12 xl:grid-cols-16 gap-32 relative xl:pt-0"
                >
                    <FilterBox />
                    <ArticlesGrid />
                </section>
            </div>
        </SearchContextProvider>
    );
}

export default Search;
