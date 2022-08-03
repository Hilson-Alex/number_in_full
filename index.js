const { NUMBERS, HUNDREDS_GROUPER, GROUP_NAMES, toPlural, normalize } = require("./numericInfo");

const reduceWithSuffixes = (string, item, index, { length }) => {
    if (!item) {
        return string
    }
    let suffix = GROUP_NAMES[length - index - 1]

    if (item !== NUMBERS.UNITS['1'])
        suffix = toPlural(suffix);

    return `${string} ${item} ${suffix}`.trim();
}

const translateHundreds = (hundredGroup) => {
   let extendedNames = [];
   const digits = ('000' + hundredGroup).slice(-3).split('')

   extendedNames.push(NUMBERS.HUNDREDS[digits[0]]);
   if (digits[1] === '1') {
       extendedNames.push(NUMBERS.TEN_DIGITS[hundredGroup.slice(1)]);
   } else {
       extendedNames.push(NUMBERS.DOZENS[digits[1]]);
       extendedNames.push(NUMBERS.UNITS[digits[2]]);
   }

   return extendedNames.filter((item) => item.length > 0).join(' e ');
}

const getIntNumberInFull = (number = 0) => {
    let stringNumber = number.toString();
    let groups = stringNumber.match(HUNDREDS_GROUPER);
    if (!groups)
        throw new Error("Invalid number format for " + number +
            ". Try something between 0 and " + Number.MAX_SAFE_INTEGER
        );

    stringNumber = groups.map(translateHundreds).reduce(reduceWithSuffixes, '');
    stringNumber = normalize(stringNumber);
    return stringNumber || NUMBERS.ZERO;
}

console.log(getIntNumberInFull(Infinity));