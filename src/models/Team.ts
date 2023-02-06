import { fixTeamsArrName } from "../utils/fixTeamsName";
import { page } from "../utils/navigationTool";
export class Team {

    static homeTeam: Array<string>
    static awayTeam: Array<string>

    public static async listTeams() {
        await this.listHomeTeams();
        await this.listAwayTeams();
    };

    private static async listHomeTeams() {

        let textHomeTeams = (await page).locator('td.text-right').allTextContents();
        let fullHomeTeams = await fixTeamsArrName(textHomeTeams);
        this.homeTeam = fullHomeTeams.map((team: string) => team);
    };

    private static async listAwayTeams() {

        let textAwaysTeams = (await page).locator('td.text-left').allTextContents();
        let fullAwayTeams = await fixTeamsArrName(textAwaysTeams);
        this.awayTeam = fullAwayTeams.map((team: string) => team);
    };
};