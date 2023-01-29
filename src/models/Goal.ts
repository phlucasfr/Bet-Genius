import { defaultFixNames } from "../utils/defaultFixNames";
import { page } from "../utils/navigationTool";

export class Goal {

    static homeGoals: Array<string>;
    static awayGoals: Array<string>;

    public static async listGoals() {
        await this.listHomeGoals();
        await this.listAwayGoals();
    };

    private static async listHomeGoals() {
        let nowHomeGoals = (await page).locator('td.hasRaceDataPopup.red-color.text-center').allTextContents();
        let fixedHomeGoals = await defaultFixNames(nowHomeGoals, true);
        this.homeGoals = fixedHomeGoals.map((goal: string) => goal);
    };

    private static async listAwayGoals() {
        let nowAwayGoals = (await page).locator('td.hasRaceDataPopup.red-color.text-center').allTextContents();
        let fixedAwayGoals = await defaultFixNames(nowAwayGoals, false);
        this.awayGoals = fixedAwayGoals.map((goal: string) => goal);
    };

};