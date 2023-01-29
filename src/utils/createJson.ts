import fs from 'fs';

export async function writeJsonArq(set: any) {

    // Transforma o objeto em uma string JSON
    let json = JSON.stringify(set);

    // Escreve a string JSON de volta para o arquivo "games.json"
    fs.writeFile('settings.json', json, 'utf8', (err) => {
        if (err) throw err;
        // console.log('Arquivo salvo com sucesso!');
    });
};


