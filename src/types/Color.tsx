import { decToHex, hexTodDec } from "../util/convertion";

export class Color {
    static toHex(r: number, g: number, b: number): string {
        const red = decToHex(r).length === 1 ? "0" + decToHex(r) : decToHex(r);
        const green = decToHex(g).length === 1 ? "0" + decToHex(g) : decToHex(g);
        const blue = decToHex(b).length === 1 ? "0" + decToHex(b) : decToHex(b);

        return `#${red}${green}${blue}`;
    }
    static toDec(color: string) {
        return {
            red: hexTodDec(color.substring(1, 3)),
            green: hexTodDec(color.substring(3, 5)),
            blue: hexTodDec(color.substring(5, 7)),
        };
    }
}
