import { defaultFixNames } from "../utils/defaultFixNames";
import { page } from "../utils/navigationTool";
export class Corner {

    static initialCorners: Array<string>;
    static homeCorners: Array<string>;
    static awayCorners: Array<string>;

    public static async listCorners() {
        await this.listInitialCorners();
        await this.listHomeCorners();
        await this.listAwayCorners();
    };

    public static async listInitialCorners() {
        let initCorners = (await page).locator('td:nth-child(8) > a').allTextContents();
        let fixedInitialCorners = await defaultFixNames(initCorners, false);
        this.initialCorners = fixedInitialCorners.map((corner: string) => corner);
    };

    private static async listHomeCorners() {
        let nowHomeCorners = (await page).locator('td.text-center.blue-color').allTextContents();
        let fixedHomeCorners = await defaultFixNames(nowHomeCorners, true);
        ; this.homeCorners = fixedHomeCorners.map((corner: string) => corner);
    };

    private static async listAwayCorners() {
        let nowAwayCorners = (await page).locator('td.text-center.blue-color').allTextContents();
        let fixedAwayCorners = await defaultFixNames(nowAwayCorners, false);
        this.awayCorners = fixedAwayCorners.map((corner: string) => corner);
    };
};