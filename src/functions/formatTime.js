function formatTime(seconds, formula) {
    const time = Math.floor(formula(seconds));
    if (time > 59) return '00';
    return (time > 9) ? time : '0' + time;       
}

const getHoursText = (seconds) => {
    const formula = (time) => time / 3600;
    return formatTime(seconds, formula);
};

const getMinutesText = (seconds) => {
    const formula = (time) => time % 3600 / 60;
    return formatTime(seconds, formula);
};

const getSecondsText = (seconds) => {
    const formula = (time) => time % 3600 % 60;
    return formatTime(seconds, formula);
};

export { getHoursText, getMinutesText, getSecondsText };

