
import { NextApiRequest, NextApiResponse } from "next"
import { google } from "googleapis"


const creds = require('../../webhook-383716-7778ec2ff896.json')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method?.toLowerCase() === "post") {
        res.status(405).json({message: "this api is only post..."})
    }
    try {
        const authClient = await google.auth.getClient( {
            keyFile: 'webhook-383716-7778ec2ff896.json',
            scopes: ['https://www.googleapis.com/auth/spreadsheets']
        });
        const sheets = google.sheets( { version: 'v4', auth: authClient } );
        sheets.spreadsheets.values.append({
            spreadsheetId: process.env.NEXT_PUBLIC_SPREAD_STHEET_ID!,
            valueInputOption: "USER_ENTERED",
            range: "A:A",
            requestBody: {
                values: [[new Date().toLocaleDateString(),new Date().toLocaleDateString(), 8, 7, 1, true, false]]
            },
        }).then((_) => {
            res.status(200).json({message: "success."})
        }).catch((e) => {
            res.status(500).json({message: e.message})
        })
    } catch (e: any) {
        res.status(500).json({message:`error: ${e.message}`})
    }
}