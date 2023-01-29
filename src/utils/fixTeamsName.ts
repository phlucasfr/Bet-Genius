export async function fixTeamsArrName(team: any) {
    let arr = [];

    arr.push(await team);

    let fix1 = arr.join().split('.').join('').split('(').join('').split(')').join('').split('+').join('').split('-').join('').split('[').join('').split(']').join('');
    let fix2 = fix1.replace(/[0-9]/g, '').replace(/\s/g, '');
    let fix3 = fix2.split(',');

    return fix3;
}
