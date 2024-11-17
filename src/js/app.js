import { PROJECT_URL, API_KEY } from './secrets.js';

//Testando import do secrets.js com as credenciais do banco de dados
console.log('URL do Projeto:', PROJECT_URL);
console.log('Chave da API:', API_KEY);

// Crie o cliente Supabase
const supabase_banco = supabase.createClient(PROJECT_URL, API_KEY);

// Função assíncrona para inserir dados
async function inserirUsuario() {
  try {
    const { error } = await supabase_banco
      .from('usuarios')
      .insert({nome: 'vivan', senha: 'ama_muitos' });
    if (error) {
      alert('Erro ao inserir dados:', error.message);
    } else {
      alert('Usuário inserido com sucesso!');
    }
  } catch (err) {
    alert('Erro inesperado:', err);
  }
}

// Chame a função para inserir o usuário
inserirUsuario();
