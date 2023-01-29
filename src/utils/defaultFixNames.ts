export async function defaultFixNames(name: any, isHome: boolean) {

    let fixedName = (await name).join().split(':').join().split(',').join().replace(/'/g, '').split(',');

    if (isHome == true) {
        fixedName = await fixedName.filter((element: any, i: number) => i % 2 === 0);

    };

    return await fixedName;
};

