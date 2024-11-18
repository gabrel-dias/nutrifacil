import { PROJECT_URL, API_KEY } from './secrets.js';

// Crie o cliente Supabase
const banco_supabase = supabase.createClient(PROJECT_URL, API_KEY);

// Captura os campos e o formulário, e adiciona os eventos de clique e input
document.addEventListener('DOMContentLoaded', () => {
  const formCadastro = document.getElementById('formCadastro');
  const nome_usuario_input = document.getElementById('nome_usuario');
  const nome_verificacao = document.getElementById('nome_verificacao');

  // Verifica o nome conforme o usuário digita
  nome_usuario_input.addEventListener('input', async () => {
    const nome_usuario = nome_usuario_input.value;

    // Verifica se o nome está no banco de dados
    const existe = await verificarNomeUsuario(nome_usuario);
    if (existe) {
      nome_verificacao.textContent = `O nome ${nome_usuario} já está presente no banco de dados.`;
      nome_verificacao.style.color = 'red';
    } else {
      nome_verificacao.textContent = `O nome ${nome_usuario} está disponível.`;
      nome_verificacao.style.color = 'green';
    }
  });

  // Adiciona o evento de submit ao formulário
  formCadastro.addEventListener('submit', async (event) => {
    event.preventDefault(); // Previne o envio padrão do formulário

    const nome_completo = document.getElementById('nome_completo').value;
    const nome_usuario = document.getElementById('nome_usuario').value;
    const senha_usuario = document.getElementById('senha_usuario').value;
    const usuario_admin = document.getElementById('usuario_admin').value;

    await inserirUsuario(nome_completo, nome_usuario, senha_usuario, usuario_admin);
  });
});

// Função para inserir dados
async function inserirUsuario(nome_completo, nome_usuario, senha_usuario, usuario_admin) {
  try {
    const { error } = await banco_supabase
      .from('usuarios')
      .insert({ nome_completo: nome_completo, nome_usuario: nome_usuario, senha_usuario: senha_usuario, admin: usuario_admin });
    if (error) {
      console.error('Erro ao inserir dados:', error.message);
    } else {
      alert('Usuário inserido com sucesso!');
    }
  } catch (err) {
    console.error('Erro inesperado:', err);
  }
}

// Função para verificar se o ID do usuário está no banco de dados
async function verificarIdUsuario(id_usuario) {
  try {
    const { data, error } = await banco_supabase
      .from('usuarios')
      .select('id')
      .eq('id', id_usuario);

    if (error) {
      console.error('Erro ao verificar ID:', error.message);
      return false;
    }

    return data.length > 0;
  } catch (err) {
    console.error('Erro inesperado:', err);
    return false;
  }
}

// Função para verificar se o nome do usuário está no banco de dados
async function verificarNomeUsuario(nome_usuario) {
  try {
    const { data, error } = await banco_supabase
      .from('usuarios')
      .select('nome_usuario')
      .eq('nome_usuario', nome_usuario);

    if (error) {
      console.error('Erro ao verificar nome:', error.message);
      return false;
    }

    return data.length > 0;
  } catch (err) {
    console.error('Erro inesperado:', err);
    return false;
  }
}
