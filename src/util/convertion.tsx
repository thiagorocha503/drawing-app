const HEX_TABLE: any = {
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
function hexTodDec(text: string) {
    return text
        .toUpperCase()
        .split("")
        .reverse()
        .reduce((acc, digit, index) => {
            return acc + HEX_TABLE[digit] * Math.pow(16, index);
        }, 0);
}
export function rgbToDec(color: string) {
    return {
        red: hexTodDec(color.substring(1, 3)),
        green: hexTodDec(color.substring(3, 5)),
        blue: hexTodDec(color.substring(5, 7)),
    };
}
