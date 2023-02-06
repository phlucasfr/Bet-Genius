# Bet Genius 

Bet Genius is a sports betting app that provides tips and predictions to help users make decisions. With Bet Genius, users can track bets in real-time and receive alerts for important events.

## Version 1.0.2
We are now implementing a database and an API to save the average number of corner kicks for home teams in the Bet Genius app. With this feature, users will be able to access and analyze important data on team performance, allowing them to make informed betting decisions.

## Features
- Tips and predictions based on advanced algorithms
- Real-time tracking of bets
- Alerts for important events
- Detailed statistics on games and teams

## Used Libraries
The following libraries were used in this project:

- **playwright**: Used for automating browser tests.
- **telegraf**: Used for building Telegram bots.
- **dotenv**: Used for managing environment variables.

## Installation
1. Clone the repository: `git clone https://github.com/phlucasfr/Bet-Genius.git`
2. Install the dependencies: `npm install`
3. Create a .env file in the root of the project with the following information:<br>
TELEGRAM_TOKEN=yourtelegramtoken<br>
TELEGRAM_ID=yourtelegramid<br>
GAME_SET=settings.json
4. *(optional)* Edit a file called "settings.json" in the root of the project. This file should contain the following information, which can be changed as necessary:<br>{
"isDefaultGame": boolean,
"homeIsNotWin": number,
"homeIsPressing": number,
"timeToBet": number,
"initCorners": number
}
6. Run the app: `npm run dev`

Note:
To use the features of this bot, you will need to acquire the Telegram bot token and the chat ID. Visit the Telegram Bot API documentation at https://core.telegram.org/bots for more information on how to do this.

## Contact

If you have any questions or suggestions, please contact the developer at phlucasfr@gmail.com
