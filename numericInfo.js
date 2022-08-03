const HUNDREDS_GROUPER = /(^\d{1,3}(?=(?:\d{3})*$))|\d{3}/g;

const UNITS = Object.freeze({
    "0": "",
    "1": "um",
    "2": "dois",
    "3": "três",
    "4": "quatro",
    "5": "cinco",
    "6": "seis",
    "7": "sete",
    "8": "oito",
    "9": "nove"
});

const TEN_DIGITS = Object.freeze({
    "10": "dez",
    "11": "onze",
    "12": "doze",
    "13": "treze",
    "14": "quatorze",
    "15": "quinze",
    "16": "dezesseis",
    "17": "dezessete",
    "18": "dezoito",
    "19": "dezenove"
});

const DOZENS = Object.freeze({
    "0": "",
    "2": "vinte",
    "3": "trinta",
    "4": "quarenta",
    "5": "cinquenta",
    "6": "sessenta",
    "7": "setenta",
    "8": "oitenta",
    "9": "noventa",
});

const HUNDREDS = Object.freeze({
    "0": "",
    "1": "cem",
    "2": "duzentos",
    "3": "trezentos",
    "4": "quatrocentos",
    "5": "quinhentos",
    "6": "seiscentos",
    "7": "setecentos",
    "8": "oitocentos",
    "9": "novecentos"
});

const ZERO = "zero";

const NUMBERS = Object.freeze({ UNITS, TEN_DIGITS, DOZENS, HUNDREDS, ZERO });

// O inteiro máximo só vai até a casa dos quatrilhões
const GROUP_NAMES = ['', 'mil', 'milhão', 'bilhão', 'trilhão', 'quatrilhão']

const toPlural = (group) => {
    return group.replace('ão', 'ões');
}

const normalize = (stringNumber) => {
    const hundreds = Object.values(HUNDREDS).join('|')
    return stringNumber
        .replaceAll(/cem(?= e)/g, "cento")
        .replace(/um (?=mil)/, "")
        .replace(new RegExp(`mil(?= ${hundreds}$)`), "mil e")
        .replace(new RegExp(`mil(?! ${hundreds})(?= \w+)`), "mil e");
}

module.exports = {
    NUMBERS,
    HUNDREDS_GROUPER,
    GROUP_NAMES,
    toPlural,
    normalize,
}