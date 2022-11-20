/* eslint-disable eqeqeq */

import { BufferGeometry, BufferAttribute } from "three";
//  两个时间戳作比较。得出距离现在的时间差
export const calculateDiffTime = (
    startTime: number,
    endTime: number
): string => {
    let runTime = parseInt((endTime - startTime).toString());

    let year = Math.floor(runTime / 86400 / 365);
    runTime = runTime % (86400 * 365);

    let month = Math.floor(runTime / 86400 / 30);
    runTime = runTime % (86400 * 30);

    let day = Math.floor(runTime / 86400);
    runTime = runTime % 86400;

    let hour = Math.floor(runTime / 3600);
    runTime = runTime % 3600;

    let minute = Math.floor(runTime / 60);

    runTime = runTime % 60;
    let second = runTime;
    let result = {
        year,
        month,
        day,
        hour,
        minute,
        second,
    };

    if (year != 0) {
        if (year == 1) {
            return `Edited ${year} year ago`;
        } else {
            return `Edited ${year} years ago`;
        }
    } else if (month != 0) {
        if (month == 1) {
            return `Edited ${month} month ago`;
        } else {
            return `Edited ${month} months ago`;
        }
    } else if (day != 0) {
        if (day == 1) {
            return `Edited ${day} day ago`;
        } else {
            return `Edited ${day} days ago`;
        }
    } else if (hour != 0) {
        if (hour == 1) {
            return `Edited ${hour} hour ago`;
        } else {
            return `Edited ${hour} hours ago`;
        }
    } else if (minute != 0) {
        if (minute == 1) {
            return `Edited ${minute} minute ago`;
        } else {
            return `Edited ${minute} minutes ago`;
        }
    } else {
        if (second == 1) {
            return `Edited ${second} second ago`;
        } else {
            return `Edited ${second} seconds ago`;
        }
    }
};

export const addBufferGeometry = (position: number[], index: number[]) => {
    const geometry = new BufferGeometry()
    const positionList = new Float32Array(position)
    const indexList = new Uint16Array(index)
    geometry.setAttribute('position', new BufferAttribute(positionList, 3))
    geometry.index = new BufferAttribute(indexList, 1)
    return geometry
}