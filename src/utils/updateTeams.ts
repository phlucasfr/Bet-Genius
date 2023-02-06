import fetch, { Body } from 'node-fetch';

export async function updateTeams(name_tem: string, qtdcor_tem: number) {
    await fetch('http://localhost:3333/createteam/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name_tem": name_tem,
            "lasgam_tem": new Date(),
            "qtdcor_tem": qtdcor_tem,
            "medcor_tem": qtdcor_tem
        })


    })
        .then(response => response.json())
        .then(data => {



            console.log(data);


        })
        .catch(error => {
            console.log(error);

        });
};