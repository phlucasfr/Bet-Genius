import { defaultFixNames } from "../utils/defaultFixNames";
import { page } from "../utils/navigationTool";
export class Time {

    static time: Array<string>

    public static async listTime() {
        let nowTimeGame = (await page).locator('td.text-center.timeTd').allTextContents();
        let fixedTimeGame = await defaultFixNames(nowTimeGame, false);
        this.time = fixedTimeGame.map((time: string) => time);
    };
};