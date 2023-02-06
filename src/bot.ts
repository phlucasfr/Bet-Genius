import { Game } from "./models/Game";
import * as readline from 'readline';
import { isValidNumber } from "./utils/isValidNumber";
import { writeJsonArq } from "./utils/createJson";
import { readSettingsFile } from "./utils/readJson";
require('dotenv').config()

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let objSetGame;
let startApp: Game;

function askAgain() {

    let objAnswers = {
        isDefaultGame: false,
        homeIsNotWin: 0,
        homeIsPressing: 0,
        timeToBet: 0,
        initCorners: 0
    };

    rl.question('Deseja usar as configurações padrões do bot? (S/N): ', (answer: string) => {

        const lowerAnswer = answer.toLowerCase();
        let state = {
            currentQuestion: 1
        };

        function getValidInput() {
            if (state.currentQuestion === 1) {
                rl.question('Por qual diferença de gols o time da casa deve estar perdendo? (1,2,3...): ', (answer: string) => {
                    if (isValidNumber(answer) && (Number(answer) > 0)) {
                        objAnswers.homeIsNotWin = Number(answer);
                        state.currentQuestion++;
                        getValidInput();
                    } else {
                        console.log('Digite um número válido!');
                        getValidInput();
                    };
                });
            } else if (state.currentQuestion === 2) {
                rl.question('Qual o mínimo de escanteios o time da casa deve ter a mais? (1,2,3...): ', (answer: string) => {
                    if (isValidNumber(answer) && (Number(answer) > 0)) {
                        objAnswers.homeIsPressing = Number(answer);
                        state.currentQuestion++;
                        getValidInput();
                    } else {
                        console.log('Digite um número válido!');
                        getValidInput();
                    };
                });
            } else if (state.currentQuestion === 3) {
                rl.question('Informe o número mínimo de escanteios iniciais que deveriam estar previstos para o jogo: (Mínimo 9): ', (answer: string) => {
                    if (isValidNumber(answer) && (Number(answer) >= 9)) {
                        objAnswers.initCorners = Number(answer);
                        state.currentQuestion++;
                        getValidInput();
                    } else {
                        console.log('Digite um número válido!');
                        getValidInput();
                    };
                });
            } else if (state.currentQuestion === 4) {
                rl.question('Qual deve ser o tempo mínimo de jogo? (Deve estar entre 1 e 90): ', (answer: string) => {
                    if (isValidNumber(answer) && (Number(answer) >= 1 && Number(answer) <= 90)) {
                        objAnswers.timeToBet = Number(answer);
                        rl.close();
                        objSetGame = objAnswers;

                        writeJsonArq(objSetGame);
                        startApp = new Game(objSetGame);
                        start();

                    } else {
                        console.log('Digite um número válido!');
                        getValidInput();
                    };
                });
            };

        };

        if (lowerAnswer === 's') {

            objAnswers.isDefaultGame = true;
            console.log('Voce escolheu as configurações padrões do bot!');
            rl.close();
            objSetGame = objAnswers;
            startApp = new Game(objSetGame);
            start();

        } else if (lowerAnswer === 'n') {
            objAnswers.isDefaultGame = false;

            rl.question('Deseja usar as ultimas configurações do bot? (S/N): ', (answer: string) => {
                const lowerAnswer = answer.toLowerCase()

                if (lowerAnswer === 's') {

                    try {
                        const objSettings = readSettingsFile(String(process.env.GAME_SET));
                        console.log('Arquivo de configuração carregado com sucesso!');

                        objAnswers = {
                            isDefaultGame: objSettings.isDefaultGame,
                            homeIsNotWin: objSettings.homeIsNotWin,
                            homeIsPressing: objSettings.homeIsPressing,
                            timeToBet: objSettings.timeToBet,
                            initCorners: objSettings.initCorners
                        };

                        rl.close();
                        objSetGame = objAnswers;
                        startApp = new Game(objSetGame);
                        start();

                    } catch (error) {
                        console.log('Arquivo inválido!');
                        getValidInput();
                    };

                } else if (lowerAnswer === 'n') {

                    console.log('Defina as configurações do bot!');
                    getValidInput();
                } else {
                    console.log("Resposta inválida. Por favor responda apenas com 'S' ou 'N'");
                    askAgain();
                };

            });

        } else {
            console.log("Resposta inválida. Por favor responda apenas com 'S' ou 'N'");
            askAgain();
        };
    });
};

askAgain();

const start = async () => {
    while (true) {
        try {
            console.log('Bot iniciado!\n');
            console.log('Buscando jogos, aguarde...');

            await startApp.startBot();
        } catch (error) {
            console.log(error);
        }
        await new Promise((resolve) => setTimeout(resolve, 120000));
    };
};