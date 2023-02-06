import { Telegraf } from "telegraf";

export async function writeSendMessage(
    homeTeam: any,
    awayTeam: any,
    time: any,
    initialCorner: any,
    homeGoals: any,
    awayGoals: any,
    homeCorner: any,
    awayCorner: any,
    blind: number
) {

    let blindMsg;

    if (blind == 1) {
        let bldMsg = "Apostar Big Blind! ";
        blindMsg = bldMsg;
    } else if (blind == 2) {
        let bldMsg = "Apostar Small Blind! ";
        blindMsg = bldMsg;
    } else if (blind == 3) {
        let bldMsg = "";
        blindMsg = bldMsg;
    };

    let msg = ("Jogo: " + await homeTeam + " X " + await awayTeam
        + "                                           Tempo: " + time + 'min'
        + "                                           Aposta inicial de escanteios: " + initialCorner
        + "                                           Gols time de casa: " + homeGoals
        + "                                           Gols time de fora: " + awayGoals
        + "                                           Escanteios time de casa: " + homeCorner
        + "                                           Escanteios time de fora: " + awayCorner
        + "                                           " + blindMsg
    );

    async function sendGamesMsgTimer(msg: string) {
        const bot = new Telegraf(String(process.env.TELEGRAM_TOKEN));

        bot.telegram.sendMessage(Number(process.env.TELEGRAM_ID), JSON.stringify(msg));
    };

    await sendGamesMsgTimer(msg);
};