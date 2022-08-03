const { NUMBERS, HUNDREDS_GROUPER, GROUP_NAMES, CONJUNCTION, toPlural, normalize } = require("./numericInfo");

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
       extendedNames.push(NUMBERS.TEN_DIGITS[hundredGroup.slice(-2)]);
   } else {
       extendedNames.push(NUMBERS.DOZENS[digits[1]]);
       extendedNames.push(NUMBERS.UNITS[digits[2]]);
   }

   return extendedNames.filter((item) => item.length > 0).join(` ${CONJUNCTION} `);
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

console.log(getIntNumberInFull(1101));
console.log(getIntNumberInFull(9020389));
console.log(getIntNumberInFull(40506070));
console.log(getIntNumberInFull(6070));
console.log(getIntNumberInFull(2222222));
console.log(getIntNumberInFull(17300));
console.log(getIntNumberInFull(2099));
console.log(getIntNumberInFull(00000));
console.log(getIntNumberInFull(0));
console.log(getIntNumberInFull(5));
console.log(getIntNumberInFull(15));
console.log(getIntNumberInFull(Number.MAX_SAFE_INTEGER));