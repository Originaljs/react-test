import { Vector2 } from "three";

export const roundTo = (n: number, factor: number) =>
    Math.round(n / factor) * factor;

export const roundToString = (n: number, factor: number) => {
    let digit = ~~Math.log10(factor);

    let unit = "um";

    if (digit < -1) {
        digit += 3;
        unit = "nm";
    } else if (digit >= 2) {
        digit -= 3;
        unit = "mm";
    }

    if (Math.abs(n) < 0.0000001) return `0${unit}`;

    const str = Math.abs(Math.round(n / factor)).toString();
    const sign = n < 0 ? "-" : "";
    if (digit < 0) {
        const s = str.padStart(1 - digit, "0");
        return `${sign}${s.slice(0, digit)}.${s.slice(digit)}${unit}`;
    } else if (digit > 0) {
        return `${sign}${str}${"0".repeat(digit)}${unit}`;
    } else return `${sign}${str}${unit}`;
};

// No trailing zeros
export const toFixedNTZ = (n: number, digit: number) =>
    n.toFixed(digit).replace(/0+$/g, "").replace(/\.$/g, "");

export const getIntersection = (p1: Vector2, p2: Vector2, p3: Vector2) => {
    // 求点到直线的交点坐标
    const P = new Vector2();

    //如果 p1.x==p2.x 说明是条竖着的线
    if (p1.x - p2.x == 0) {
        P.x = p1.x;
        P.y = p3.y;
    } else {
        const A = (p1.y - p2.y) / (p1.x - p2.x);
        const B = p1.y - A * p1.x;
        const m = p3.x + A * p3.y;

        P.x = (m - A * B) / (A * A + 1);
        P.y = A * P.x + B;
    }

    return P;
};

export const point2line = (p1: Vector2, p2: Vector2, p3: Vector2) => {
    // 获取点到直线的距离
    let len: number;

    //如果 p1.x==p2.x 说明是条竖着的线
    if (p1.x - p2.x == 0) {
        len = Math.abs(p3.x - p1.x);
    } else {
        const A = (p1.y - p2.y) / (p1.x - p2.x);
        const B = p1.y - A * p1.x;

        len = Math.abs((A * p3.x + B - p3.y) / Math.sqrt(A * A + 1));
    }

    return len;
};
