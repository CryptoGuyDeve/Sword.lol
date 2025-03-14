import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const CLIENT_ID = process.env.DISCORD_CLIENT_ID!;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET!;
const REDIRECT_URI = 'http://localhost:3000/auth/discord/callback';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const code = req.query.code;

  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  try {
    // Exchange code for access token
    const { data } = await axios.post(
      'https://discord.com/api/oauth2/token',
      new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code.toString(),
        redirect_uri: REDIRECT_URI
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const accessToken = data.access_token;

    // Fetch user data from Discord
    const { data: userData } = await axios.get('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    // Store or update the data in Supabase
    const { error } = await supabase.from('users').upsert({
      discord_id: userData.id,
      discord_username: userData.username,
      discord_avatar: userData.avatar
    });

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to save user data' });
    }

    // Redirect back to account page
    res.redirect('/account');
  } catch (err) {
    console.error('OAuth error:', err);
    res.status(500).json({ error: 'OAuth failed' });
  }
}
