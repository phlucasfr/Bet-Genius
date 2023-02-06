import { writeSendMessage } from "../utils/messaging";
import { updateTeams } from "../utils/updateTeams";
import { Corner } from "./Corner";
import { Goal } from "./Goal";
import { Team } from "./Team";
import { Time } from "./Time";
export class Game {

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

    //make object of game
    private async makeGame() {

        //tenta listar os atributos
        try {
            await this.listAtrOfGames();

        } catch (error) {
            // console.error(error);
        };
        let arr = [];
        for (let i = 0; i < Time.time.length; i++) {

            if (parseInt(Time.time[i]) > 0 || Time.time[i] == 'HT') {
                let objOfGames = {
                    time: Time.time[i] == 'HT' ? 45 : parseInt(Time.time[i]),
                    initialCorner: parseFloat(Corner.initialCorners[i]),
                    initialCornerGreen: false,
                    homeIsNotWin: false,
                    halfInitialCornersInFifteen: false,
                    homeIsPressing: false,
                    gonnaBetInGame: false
                };

                //define se os parametros do objeto sãoo personalizados
                if (this.isDefaultGame) {

                    objOfGames.initialCornerGreen = (parseInt(Corner.homeCorners[i]) + parseInt(Corner.awayCorners[i])) > parseInt(Corner.initialCorners[i]);
                    objOfGames.homeIsNotWin = parseInt(Goal.awayGoals[i]) - parseInt(Goal.homeGoals[i]) === 2;
                    objOfGames.halfInitialCornersInFifteen = parseInt(Time.time[i]) <= 15 && parseInt(Corner.homeCorners[i]) + parseInt(Corner.awayCorners[i]) >= (parseInt(Corner.initialCorners[i]) / 2) && parseInt(Corner.initialCorners[i]) > 9;
                    objOfGames.homeIsPressing = objOfGames.homeIsNotWin && parseInt(Corner.homeCorners[i]) > parseInt(Corner.awayCorners[i]);

                    if (objOfGames.homeIsNotWin && objOfGames.homeIsPressing && objOfGames.halfInitialCornersInFifteen && objOfGames.initialCorner > 9) {
                        objOfGames.gonnaBetInGame = true;
                        arr.push(objOfGames);
                        await writeSendMessage(Team.homeTeam[i], Team.awayTeam[i], objOfGames.time, Corner.initialCorners[i], Goal.homeGoals[i], Goal.awayGoals[i], Corner.homeCorners[i], Corner.awayCorners[i], 2);
                        console.log('Jogo encontrado! Verifique as notificações do seu smartphone...');
                        await updateTeams(Team.homeTeam[i], Number(Corner.homeCorners[i]));

                    } else if (parseInt(Time.time[i]) <= 70 && objOfGames.initialCornerGreen && objOfGames.homeIsNotWin && objOfGames.homeIsPressing && objOfGames.initialCorner > 9) {
                        objOfGames.gonnaBetInGame = true;
                        arr.push(objOfGames);
                        await writeSendMessage(Team.homeTeam, Team.awayTeam, objOfGames.time, Corner.initialCorners[i], Goal.homeGoals, Goal.awayGoals, Corner.homeCorners[i], Corner.awayCorners[i], 1);
                        console.log('Jogo encontrado! Verifique as notificações do seu smartphone...');
                        await updateTeams(Team.homeTeam[i], Number(Corner.homeCorners[i]));
                    };

                } else {

                    objOfGames.homeIsNotWin = parseInt(Goal.awayGoals[i]) - parseInt(Goal.homeGoals[i]) === this.homeIsNotWin;
                    objOfGames.homeIsPressing = objOfGames.homeIsNotWin && parseInt(Corner.homeCorners[i]) - parseInt(Corner.awayCorners[i]) >= this.homeIsPressing;

                    if (objOfGames.homeIsNotWin && objOfGames.homeIsPressing && parseInt(Time.time[i]) >= this.timeToBet && parseFloat(Corner.initialCorners[i]) >= this.initCorners) {
                        objOfGames.gonnaBetInGame = true;
                        arr.push(objOfGames);
                        await writeSendMessage(Team.homeTeam, Team.awayTeam, objOfGames.time, Corner.initialCorners[i], Goal.homeGoals[i], Goal.awayGoals[i], Corner.homeCorners[i], Corner.awayCorners[i], 3);
                        console.log('Jogo encontrado! Verifique as notificações do seu smartphone...');
                        await updateTeams(Team.homeTeam[i], Number(Corner.homeCorners[i]));
                    };
                };

            };
        };
    };
};