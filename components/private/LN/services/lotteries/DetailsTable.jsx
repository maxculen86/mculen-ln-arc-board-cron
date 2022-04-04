import { React } from 'react';
import PropTypes from 'prop-types';
import '../../../../../resources/dist/css/ln/components/details-table.css';

const DetailsTable = ({ data }) => {
    const {
        winners_table: winnersTable = [],
        name,
        estimatedPot = '',
        winner_carton: winnerCarton = []
    } = data;
    return (
        <section className="table-container">
            {winnersTable.length > 0 && (
                <table className="table --winners-table">
                    <thead>
                        <tr>
                            <th>Aciertos</th>
                            <th>Ganadores</th>
                            <th>Premios</th>
                        </tr>
                    </thead>
                    <tbody>
                        {winnersTable.map(x => {
                            return (
                                <tr>
                                    <td>{x.name ? x.name : '-'}</td>
                                    <td>
                                        {x.winners && x.winners !== '0'
                                            ? x.winners
                                            : '-'}
                                    </td>
                                    <td>
                                        {x.amount && x.amount !== '$0'
                                            ? x.amount
                                            : '-'}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
            {name && estimatedPot && (
                <table className="table">
                    <thead>
                        <tr>
                            <th>{`Próximo pozo de ${name}`}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="estimated-pot">{estimatedPot}</td>
                        </tr>
                    </tbody>
                </table>
            )}
            {winnerCarton.length > 0 && winnerCarton[0].numbers !== '0' && (
                <table className="table">
                    <thead>
                        <tr>
                            <th colSpan={winnerCarton.length}>
                                Cartones Ganadores
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {winnerCarton.map(carton => {
                                return (
                                    <td className="border-divider">
                                        {carton.numbers}
                                    </td>
                                );
                            })}
                        </tr>
                    </tbody>
                    {winnerCarton[0].amount !== '$0' && (
                        <tfoot>
                            <tr>
                                <td colSpan={winnerCarton.length}>
                                    {`${winnerCarton[0].amount} C/U`}
                                </td>
                            </tr>
                        </tfoot>
                    )}
                </table>
            )}
        </section>
    );
};

DetailsTable.propTypes = {
    data: PropTypes.shape({
        component: PropTypes.string,
        date: PropTypes.string,
        estimatedPot: PropTypes.string,
        id: PropTypes.string,
        name: PropTypes.string,
        results: PropTypes.arrayOf(PropTypes.string),
        winners_table: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                winners: PropTypes.string,
                amount: PropTypes.string
            })
        ),
        winner_carton: PropTypes.arrayOf(
            PropTypes.shape({
                numbers: PropTypes.string,
                amount: PropTypes.string
            })
        )
    })
};
DetailsTable.defaultProps = {
    data: {}
};

export default DetailsTable;
