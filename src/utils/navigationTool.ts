import { Page, webkit } from "playwright";

const urlToGo: string = 'https://lv.scorebing.com/corner';
export const browser = webkit.launch({ headless: true });
export const page: Promise<Page> = navigateToUrl();

async function navigateToUrl() {

    let navigate = (await browser).newPage();

    //navega até a url
    try {
        await (await navigate).goto(urlToGo);

    } catch (error) {
        // console.error(`Error navigating to ${urlToGo}: ${error}`);
    };
    return navigate;
};