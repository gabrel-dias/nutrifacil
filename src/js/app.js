import { PROJECT_URL, API_KEY } from './secrets.js';

//Testando import do secrets.js com as credenciais do banco de dados
console.log('URL do Projeto:', PROJECT_URL);
console.log('Chave da API:', API_KEY);

// Crie o cliente Supabase
const supabase_banco = supabase.createClient(PROJECT_URL, API_KEY);

// dados do formuário


// Função assíncrona para inserir dados
async function inserirUsuario() {
  try {
    const { error } = await supabase_banco
      .from('usuarios')
      .insert({ id: 1, nome: 'vivan', senha: 'ama_muitos' });
    if (error) {
      console.error('Erro ao inserir dados:', error.message);
    } else {
      alert('Usuário inserido com sucesso!');
    }
  } catch (err) {
    console.error('Erro inesperado:', err);
  }
}

// testando função para verificar o id do usuário


inserirUsuario();