export default `
    lotteries {
        date
        id
        letters
        link
        meaning
        name
        results {
            name
            date
            result
            jackpot
        }
        vacantPot
    }
    lotteryDetail {
        date
        estimatedPot
        jackpot
        id
        letters
        name
        results
        meaning
        winners_carton {
            numbers
            amount
        }
        winners_table {
            amount
            name
            winners
        }
    }
    rules {
        description
        text
    }
    name
`;
