const Beautifier = {
    toPhone(value) {
        if ((!value) || (value === '+')) return value;

        const cleanString = value.replace(/[^\d]/g, (match, offset) => (((match === '+') && (offset === 0)) ? match : ''));
        const cleanArray = cleanString.split('');

        if (cleanArray[0] !== '+') cleanArray.unshift('+');
        if (cleanArray[1] === '8') cleanArray[1] = '7';
        else if (cleanArray[1] === '9') cleanArray.splice(1, 0, '7');
        else if (cleanArray[1] !== '7') cleanArray.splice(1, 0, '7', '9');

        const result = cleanArray.join('');

        if (result.length <= 5) return result;
        if (result.length <= 8) return `${result.slice(0, 2)} (${result.slice(2, 5)}) ${result.slice(5, 8)}`;
        if (result.length <= 10) return `${result.slice(0, 2)} (${result.slice(2, 5)}) ${result.slice(5, 8)} ${result.slice(8, 10)}`;
        return `${result.slice(0, 2)} (${result.slice(2, 5)}) ${result.slice(5, 8)} ${result.slice(8, 10)}-${result.slice(10, 12)}`;
    },
};

export default Beautifier;
