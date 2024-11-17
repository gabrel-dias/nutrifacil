import { PROJECT_URL, API_KEY } from './secrets.js';

//Testando import do secrets.js com as credenciais do banco de dados
console.log('URL do Projeto:', PROJECT_URL);
console.log('Chave da API:', API_KEY);

// Crie o cliente Supabase
const supabase_teste = supabase.createClient(PROJECT_URL, API_KEY);

// Função assíncrona para inserir dados
async function inserirUsuario() {
  try {
    const { error } = await supabase_teste
      .from('usuarios')
      .insert({ id: 0, nome: 'gabriel', senha: 'ama_bruna' });

    if (error) {
      console.error('Erro ao inserir dados:', error.message);
    } else {
      console.log('Usuário inserido com sucesso!');
    }
  } catch (err) {
    console.error('Erro inesperado:', err);
  }
}

// Chame a função para inserir o usuário
inserirUsuario();
