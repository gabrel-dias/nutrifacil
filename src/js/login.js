import { PROJECT_URL, API_KEY } from './secrets.js';

// Cria o cliente Supabase
const banco_supabase = supabase.createClient(PROJECT_URL, API_KEY);

