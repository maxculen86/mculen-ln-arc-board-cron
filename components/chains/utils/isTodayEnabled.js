const isTodayEnabled = (enabledDays = []) => {
    const days = [
        'domingo',
        'lunes',
        'martes',
        'miercoles',
        'jueves',
        'viernes',
        'sabado'
    ];

    const normalizedEnabledDays = enabledDays.map(day =>
        day.toLowerCase().trim()
    );

    return normalizedEnabledDays.includes(days[new Date().getDay()]);
};

export default isTodayEnabled;
