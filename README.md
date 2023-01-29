# Bet-Genius

O Bet-Genius é um aplicativo de apostas esportivas que fornece dicas e previsões para ajudar os usuários a tomar decisões. Com o Bet-Genius, os usuários podem acompanhar as apostas em tempo real e receber alertas de eventos importantes.

## Funcionalidades
- Dicas e previsões baseadas em algoritmos avançados
- Acompanhamento em tempo real de apostas
- Alertas de eventos importantes
- Estatísticas detalhadas sobre jogos e equipes

## Bibliotecas Utilizadas
As seguintes bibliotecas foram utilizadas neste projeto:

- **playwright**: Utilizada para automatizar testes de navegadores.
- **telegraf**: Utilizada para construir bots do Telegram.
- **dotenv**: Utilizada para gerenciar variáveis de ambiente.

## Instalação
1. Clone o repositório: `git clone https://github.com/phlucasfr/Bet-Genius.git`
2. Instale as dependências: `npm install`
3. *(opcional)* Crie um arquivo .env na raiz do projeto com as seguintes informações:<br>
TELEGRAM_TOKEN="seu telegram token"<br>
TELEGRAM_ID=seu telegram id<br>
GAME_SET="settings.json"
4. Crie um arquivo chamado "settings.json" na raiz do projeto. Este arquivo deve conter as seguintes informações, que podem ser alteradas conforme a necessidade do usuário:<br>{
"isDefaultGame": boolean,
"homeIsNotWin": number,
"homeIsPressing": number,
"timeToBet": number,
"initCorners": number
}
6. Execute o aplicativo: `npm run dev`

Observação:
Para usar os recursos desse bot, será necessário adquirir o token de bot do Telegram e o ID do chat. Visite a documentação da API do Telegram Bot em https://core.telegram.org/bots para obter mais informações sobre como fazer isso.

## Contato

Se você tiver alguma dúvida ou sugestão, entre em contato com o desenvolvedor pelo e-mail phlucasfr@gmail.com
