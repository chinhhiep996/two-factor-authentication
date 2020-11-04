import path from 'path';
import express from 'express';

const __dirname = path.resolve();

export async function getHomePage(req: express.Request, res: express.Response) {
    return res.sendFile(path.join(`${__dirname}/src/views/home.html`));
}
