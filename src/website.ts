const fetch = require('node-fetch');
const TurndownService = require('turndown');

export default class Website {
    url: String;
    constructor(url: String) {
        this.url = url;
    }

    async download() : Promise<String> {
        let response = await fetch(this.url);
        let body = await response.text();
        const turndownService = new TurndownService();
        const markdown = turndownService.turndown(body);
        return markdown;
    }
}