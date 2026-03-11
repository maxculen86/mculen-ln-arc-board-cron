import React from 'react';
import { Icon } from '@ln/common-ui-icon';
import { Text } from '@ln/contenidos-ui-text';
import FuneralSearch from './FuneralSearch';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
import { getSelectOptionClass, handleSearch } from '../_helpers';

function SearchFuneberesUI({
    data,
    values,
    onKeywordChange,
    selectedOption,
    handleSelectedOption
}) {
    return (
        <FuneralSearch className="mb-16 mb-32_l">
            <Text className="prumo-medium text-18 text-light-600">Buscar:</Text>
            <div className="flex flex-column gap-16 flex-row_m gap-8_m">
                <div className="w-183_md">
                    <FuneralSearch.Select
                        defaultValue={selectedOption}
                        value={selectedOption}
                        onChange={handleSelectedOption}
                    >
                        {data.map(({ value, label }) => (
                            <FuneralSearch.Option
                                key={value}
                                value={value}
                                label={label}
                                className={getSelectOptionClass({
                                    selectedValue: selectedOption.value,
                                    optionValue: value
                                })}
                            />
                        ))}
                    </FuneralSearch.Select>
                </div>
                <div className="w-429_md">
                    <FuneralSearch.Input
                        name="keyword"
                        label="Nombre y/o Apellido"
                        description="*Opcional"
                        value={values.keyword}
                        onChange={onKeywordChange}
                        floatingLabelProps={{
                            className: 'bg-white'
                        }}
                    />
                </div>
            </div>
            <FuneralSearch.Button
                title="Buscar avisos"
                onClick={() => handleSearch(values.keyword, selectedOption)}
            >
                <Icon size={16}>
                    <IconSprite name="search" />
                </Icon>
                <Text>Buscar avisos</Text>
            </FuneralSearch.Button>
        </FuneralSearch>
    );
}

export default SearchFuneberesUI;
