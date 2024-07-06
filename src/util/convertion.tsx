const HEX_TO_DEC_TABLE: any = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15,
};
const DEC_TO_HEX_TABLE: any = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    10: "A",
    11: "B",
    12: "C",
    13: "D",
    14: "E",
    15: "F",
};

export function hexTodDec(text: string): number {
    return text
        .toUpperCase()
        .split("")
        .reverse()
        .reduce((acc, digit, index) => {
            return acc + HEX_TO_DEC_TABLE[digit] * Math.pow(16, index);
        }, 0);
}

export function decToHex(value: number): string {
    const remainder = [];
    if (value === 0) {
        return `${value}`;
    }
    let quotient = value;
    while (quotient !== 0) {
        remainder.push(DEC_TO_HEX_TABLE[quotient % 16]);
        quotient = Math.floor(quotient / 16);
    }
    return remainder.reverse().join("");
}
