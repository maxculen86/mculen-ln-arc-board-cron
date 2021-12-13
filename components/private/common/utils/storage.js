/* eslint-disable eqeqeq */
export const setStorageConfiguration = notaId => {
    if (typeof window === 'undefined') return false;
    counterNota(notaId);
    return true;
};

export const counterNota = notaId => {
    let lsNotasCounter = JSON.parse(localStorage.getItem('NotasCounterData'));

    const today = new Date();
    const fecha = `${today.getFullYear()}-${today.getMonth() +
        1}-${today.getDate()}`;

    if (lsNotasCounter != null) {
        // Se encarga de filtrar las notas que superan los X dias ( 28 seteado hoy )
        lsNotasCounter = filterNotesWithinDays(lsNotasCounter, 28);

        if (!lsNotasCounter.some(n => n.notaId === notaId)) {
            lsNotasCounter.push({ notaId, fecha });
        }
    }

    if (lsNotasCounter == null) {
        lsNotasCounter = [{ notaId, fecha }];
    }

    localStorage.setItem('NotasCounterData', JSON.stringify(lsNotasCounter));
    localStorage.setItem('countNotas', lsNotasCounter.length);
};

export const filterNotesWithinDays = (notas, days) => {
    const today = new Date();
    const lsDayCheckCounter = localStorage.getItem('DayCheckCounter');
    let newNotas = { ...notas };
    // Una vez por dia para ser mas performante
    if (lsDayCheckCounter != today.getDate()) {
        newNotas = notas.filter(n => checkDateCounter(n.fecha, days));
    }
    localStorage.setItem('DayCheckCounter', today.getDate());
    return newNotas;
};

const checkDateCounter = (fechaCheck, days) => {
    const date1 = new Date(fechaCheck);
    const date2 = new Date(Date.now());
    // eslint-disable-next-line radix
    const diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24));

    if (diffDays < days) {
        return true;
    }

    return false;
};
