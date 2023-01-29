import * as fs from "fs";

interface GameConfig {
    isDefaultGame: boolean;
    homeIsNotWin: number;
    homeIsPressing: number;
    timeToBet: number;
    initCorners: number;
};

export function readSettingsFile(fileName: string): GameConfig {
    const fileContent = fs.readFileSync(fileName, "utf8");

    return JSON.parse(fileContent);
};
