import React from 'react';
import { optionsTime } from './_helpers';
import SearchFuneberesUI from './componentes/SearchFunebresUI';
import useInputListener from '../../LN-common/hooks/useInputListener';
import useSelectListener from '../../LN-common/hooks/useSelectListener';

function SearchObituaries() {
    const timeOptions = optionsTime;

    const { values, onChange: onKeywordChange } = useInputListener({
        keyword: ''
    });

    const { selectValue: selectedOption, onSelectChange } = useSelectListener(
        timeOptions[0]
    );

    return (
        <SearchFuneberesUI
            data={timeOptions}
            values={values}
            onKeywordChange={onKeywordChange}
            selectedOption={selectedOption}
            handleSelectedOption={onSelectChange}
        />
    );
}

SearchObituaries.label = 'LN-Funebres-Buscador';

export default SearchObituaries;
