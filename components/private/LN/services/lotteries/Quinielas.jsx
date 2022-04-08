/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import CardLayout from './CardLayout';
import LabelText from './LabelText';
import Text from '../../../common/text';
import ResultItem from './ResultItem';

const Quinielas = ({
    name,
    date,
    results,
    link,
    letters,
    meaning,
    isDetail
}) => {
    const arrResults = results.slice(1, 5);

    return (
        <CardLayout
            title={name}
            subtitle={`${results[0].name} - ${date}`}
            link={link}
            linkTitle={name}
        >
            <div className="main-result --quinielas">
                <Text weight="bold" size="2xl">
                    {results[0].result[0]}
                </Text>
                {letters && isDetail && (
                    <LabelText text={`Letras: ${letters}`} />
                )}
                {meaning && <LabelText text={meaning} />}
            </div>
            <div className="extra-results">
                {arrResults.map(item => (
                    <ResultItem
                        key={item.name}
                        text={`${item.date} - ${item.name}`}
                        result={[item.result[0]]}
                    />
                ))}
            </div>
        </CardLayout>
    );
};

Quinielas.propTypes = {
    results: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            date: PropTypes.string,
            result: PropTypes.arrayOf(PropTypes.string)
        })
    ),
    name: PropTypes.string,
    date: PropTypes.string,
    link: PropTypes.string,
    letters: PropTypes.arrayOf(PropTypes.string),
    meaning: PropTypes.string
};

Quinielas.defaultProps = {
    results: [],
    name: '',
    date: '',
    link: '',
    letters: [],
    meaning: ''
};

export default Quinielas;
