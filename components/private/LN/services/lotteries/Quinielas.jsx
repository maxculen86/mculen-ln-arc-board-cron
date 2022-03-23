import React from 'react';
import PropTypes from 'prop-types';

import CardLayout from './CardLayout';
import LabelText from './LabelText';
import Text from '../../../common/text';
import ResultItem from './ResultItem';

const Quinielas = ({ name, date, results, link, letters }) => {
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
                {letters && <LabelText text={`Letras: ${letters}`} />}
            </div>
            <div className="extra-results">
                {results.map(item => (
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
    results: PropTypes.arrayOf,
    name: PropTypes.string,
    date: PropTypes.string,
    link: PropTypes.string,
    letters: PropTypes.string
};

Quinielas.defaultProps = {
    results: [],
    name: '',
    date: '',
    link: '',
    letters: ''
};

export default Quinielas;
