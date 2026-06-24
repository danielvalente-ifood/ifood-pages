import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

function parsePrivateKey(raw: string): string {
  // Remove aspas externas que o dotenv às vezes preserva
  const trimmed = raw.trim().replace(/^["']|["']$/g, '');
  // Converte \n literais em quebras de linha reais
  return trimmed.replace(/\\n/g, '\n');
}

function makeAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!email || !rawKey) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_EMAIL e GOOGLE_PRIVATE_KEY são obrigatórios');
  }

  const key = parsePrivateKey(rawKey);

  return new google.auth.GoogleAuth({
    credentials: { client_email: email, private_key: key },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

export async function POST(req: NextRequest) {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) {
    return NextResponse.json({ error: 'GOOGLE_SHEET_ID não configurado' }, { status: 500 });
  }

  let body: { headers: string[]; values: string[]; pageUrl: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Payload inválido' }, { status: 400 });
  }

  const { headers, values, pageUrl } = body;

  if (!headers?.length || !values?.length) {
    return NextResponse.json({ error: 'headers e values são obrigatórios' }, { status: 400 });
  }

  try {
    const auth = makeAuth();
    const sheets = google.sheets({ version: 'v4', auth });
    const range = 'A1';

    // Verifica se a planilha já tem cabeçalho na primeira linha
    // Sempre mantém a linha 1 em sync com os campos do formulário
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: 'A1',
      valueInputOption: 'RAW',
      requestBody: { values: [['Data/Hora', 'Página', ...headers]] },
    });

    const now = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'A:Z',
      valueInputOption: 'RAW',
      requestBody: { values: [[now, pageUrl, ...values]] },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[leads]', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
