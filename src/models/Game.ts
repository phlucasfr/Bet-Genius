import { writeSendMessage } from "../utils/messaging";
import { browser, page } from "../utils/navigationTool";
import { Corner } from "./Corner";
import { Goal } from "./Goal";
import { Team } from "./Team";
import { Time } from "./Time";

export class Game {

    private time: Array<string> = [''];
    private homeTeam: Array<string> = [''];
    private awayTeam: Array<string> = [''];
    private initialCorner: Array<string> = [''];
    private homeGoals: Array<string> = [''];
    private awayGoals: Array<string> = [''];
    private homeCorner: Array<string> = [''];
    private awayCorner: Array<string> = [''];
    private isDefaultGame: boolean = false;
    private homeIsNotWin: number = 0;
    private homeIsPressing: number = 0;
    private timeToBet: number = 0;
    private initCorners: number = 0

    constructor(settings: {
        isDefaultGame: boolean,
        homeIsNotWin: number,
        homeIsPressing: number,
        timeToBet: number,
        initCorners: number
    }) {
        this.isDefaultGame = settings.isDefaultGame;
        this.homeIsNotWin = settings.homeIsNotWin;
        this.homeIsPressing = settings.homeIsPressing;
        this.timeToBet = settings.timeToBet;
        this.initCorners = settings.initCorners;
    };

    //Start the bot
    public async startBot() {
        await this.makeGame();
    };

    //list attributes of games
    private async listAtrOfGames() {
        await Time.listTime();
        await Team.listTeams();
        await Corner.listCorners();
        await Goal.listGoals();
    };

    private setGameValues() {
        this.time = Time.time;
        this.homeTeam = Team.homeTeam;
        this.awayTeam = Team.awayTeam;
        this.initialCorner = Corner.initialCorners;
        this.homeCorner = Corner.homeCorners;
        this.awayCorner = Corner.awayCorners;
        this.homeGoals = Goal.homeGoals;
        this.awayGoals = Goal.awayGoals;
    };

    //make object of game
    private async makeGame() {

        //tenta listar os atributos
        try {
            await this.listAtrOfGames();
        } catch (error) {
            // console.error(error);
        };

        //set nos valores no jogo
        this.setGameValues();

        // fecha o browser
        (await page).close();
        (await browser).close();

        let arr = [];
        for (let i = 0; i < this.time.length; i++) {
            if (parseInt(this.time[i]) > 0 || this.time[i] == 'HT') {
                let objOfGames = {
                    time: this.time[i] == 'HT' ? 45 : parseInt(this.time[i]),
                    initialCorner: parseFloat(this.initialCorner[i]),
                    homeTeam: this.homeTeam[i],
                    awayTeam: this.awayTeam[i],
                    homeGoals: parseInt(this.homeGoals[i]),
                    awayGoals: parseInt(this.awayGoals[i]),
                    homeCorner: parseInt(this.homeCorner[i]),
                    awayCorner: parseInt(this.awayCorner[i]),
                    initialCornerGreen: false,
                    homeIsNotWin: false,
                    halfInitialCornersInFifteen: false,
                    homeIsPressing: false,
                    gonnaBetInGame: false
                };

                //define se os parametros do objeto sÃ£oo personalizados
                if (this.isDefaultGame) {

                    objOfGames.initialCornerGreen = (parseInt(this.homeCorner[i]) + parseInt(this.awayCorner[i])) > parseInt(this.initialCorner[i]);
                    objOfGames.homeIsNotWin = parseInt(this.awayGoals[i]) - parseInt(this.homeGoals[i]) === 2;
                    objOfGames.halfInitialCornersInFifteen = parseInt(this.time[i]) <= 15 && parseInt(this.homeCorner[i]) + parseInt(this.awayCorner[i]) >= (parseInt(this.initialCorner[i]) / 2) && parseInt(this.initialCorner[i]) > 9;
                    objOfGames.homeIsPressing = objOfGames.homeIsNotWin && parseInt(this.homeCorner[i]) > parseInt(this.awayCorner[i]);

                    if (objOfGames.homeIsNotWin && objOfGames.homeIsPressing && objOfGames.halfInitialCornersInFifteen && objOfGames.initialCorner > 9) {
                        objOfGames.gonnaBetInGame = true;
                        arr.push(objOfGames);
                        await writeSendMessage(objOfGames.homeTeam, objOfGames.awayTeam, objOfGames.time, objOfGames.initialCorner, objOfGames.homeGoals, objOfGames.awayGoals, objOfGames.homeCorner, objOfGames.awayCorner, 2);
                        console.log('Jogo encontrado! Verifique as notificações do seu smartphone...');

                    } else if (parseInt(this.time[i]) <= 70 && objOfGames.initialCornerGreen && objOfGames.homeIsNotWin && objOfGames.homeIsPressing && objOfGames.initialCorner > 9) {
                        objOfGames.gonnaBetInGame = true;
                        arr.push(objOfGames);
                        await writeSendMessage(objOfGames.homeTeam, objOfGames.awayTeam, objOfGames.time, objOfGames.initialCorner, objOfGames.homeGoals, objOfGames.awayGoals, objOfGames.homeCorner, objOfGames.awayCorner, 1);
                        console.log('Jogo encontrado! Verifique as notificações do seu smartphone...');
                    };

                } else {

                    objOfGames.homeIsNotWin = parseInt(this.awayGoals[i]) - parseInt(this.homeGoals[i]) === this.homeIsNotWin;
                    objOfGames.homeIsPressing = objOfGames.homeIsNotWin && parseInt(this.homeCorner[i]) - parseInt(this.awayCorner[i]) >= this.homeIsPressing;

                    if (objOfGames.homeIsNotWin && objOfGames.homeIsPressing && parseInt(this.time[i]) >= this.timeToBet && parseFloat(this.initialCorner[i]) >= this.initCorners) {
                        objOfGames.gonnaBetInGame = true;
                        arr.push(objOfGames);
                        await writeSendMessage(objOfGames.homeTeam, objOfGames.awayTeam, objOfGames.time, objOfGames.initialCorner, objOfGames.homeGoals, objOfGames.awayGoals, objOfGames.homeCorner, objOfGames.awayCorner, 3);
                        console.log('Jogo encontrado! Verifique as notificações do seu smartphone...');
                    };
                };
            };
        };
    };
};