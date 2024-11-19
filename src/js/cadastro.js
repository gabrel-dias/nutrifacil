import { PROJECT_URL, API_KEY } from './secrets.js';

// Crie o cliente Supabase
const banco_supabase = supabase.createClient(PROJECT_URL, API_KEY);

// Captura os campos e o formulário, e adiciona os eventos de clique e input
document.addEventListener('DOMContentLoaded', () => {
  const formCadastro = document.getElementById('formCadastro');
  const email_usuario_input = document.getElementById('EMAIL');
  const nome_verificacao = document.getElementById('email_verificacao');

  // Verifica o nome conforme o usuário digita
  email_usuario_input.addEventListener('input', async () => {
    const email_usuario = email_usuario_input.value;

    // Verifica se o nome está no banco de dados
    const existe = await verificarEmailUsuario(email_usuario);
    if (existe) {
      nome_verificacao.textContent = `O e-mail ${email_usuario} já está presente no banco de dados.`;
      nome_verificacao.style.color = 'red';
    } else {
      nome_verificacao.textContent = `O e-mail ${email_usuario} está disponível.`;
      nome_verificacao.style.color = 'green';
    }
  });

  // Adiciona o evento de submit ao formulário
  formCadastro.addEventListener('submit', async (event) => {
    event.preventDefault(); // Previne o envio padrão do formulário

    // informações pessoais do usuario e seu tipo
    const nome = document.getElementById('NOME').value;
    const cpf = document.getElementById('CPF').value;
    const email = document.getElementById('EMAIL').value;
    const senha = document.getElementById('SENHA').value;
    const telefone = document.getElementById('TELEFONE').value;
    const tipo_usuario = document.getElementById('TIPOUSUARIO').value;

    //endereço do usuário
    const cep = document.getElementById('CEP').value;
    const logradouro = document.getElementById('LOGRADOURO').value;
    const numero = document.getElementById('NUMERO').value;
    const bairro = document.getElementById('BAIRRO').value;
    const cidade = document.getElementById('CIDADE').value;
    const uf = document.getElementById('UF').value;


    await inserirUsuario(nome, cpf, email, senha, telefone, tipo_usuario, cep, logradouro, numero, bairro, cidade, uf);
  });
});

// Função para inserir dados
async function inserirUsuario(nome, cpf, email, senha, telefone, tipo_usuario, cep, logradouro, numero, bairro, cidade, uf) {
  try {
    const { error } = await banco_supabase
      .from('TBUsuarios')
      .insert({ NOME: nome, CPF: cpf, EMAIL: email, SENHA: senha, TELEFONE: telefone, TIPOUSUARIO: tipo_usuario, CEP: cep, LOGRADOURO: logradouro, NUMERO: numero, BAIRRO: bairro, CIDADE: cidade, UF: uf });
    if (error) {
      console.error('Erro ao inserir dados:', error.message);
    } else {
      alert('Usuário inserido com sucesso!');
    }
  } catch (err) {
    console.error('Erro inesperado:', err);
  }
}


async function verificarEmailUsuario(EMAIL) {
  try {
    const { data, error } = await banco_supabase
      .from('TBUsuarios')
      .select('EMAIL')
      .eq('EMAIL', EMAIL);

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
