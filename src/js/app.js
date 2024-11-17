import { PROJECT_URL, API_KEY } from './secrets.js';

// Testando import do secrets.js com as credenciais do banco de dados
alert("Banco de dados conectado com sucesso!")

// Crie o cliente Supabase
const banco_supabase = supabase.createClient(PROJECT_URL, API_KEY);

// Captura os botões e adiciona os eventos de clique
document.addEventListener('DOMContentLoaded', () => {
    const formCadastro = document.getElementById('formCadastro');
    const btnCadastrar = document.getElementById('btnCadastrar');
    const btnVerificar = document.getElementById('btnVerificar');
    
    btnCadastrar.addEventListener('click', async () => {
        const id_usuario = document.getElementById('id_usuario').value;
        const nome_usuario = document.getElementById('nome_usuario').value;
        const senha_usuario = document.getElementById('senha_usuario').value;

        await inserirUsuario(id_usuario, nome_usuario, senha_usuario);
    });

    btnVerificar.addEventListener('click', async () => {
        const id_usuario = document.getElementById('id_usuario').value;

        const existe = await verificarIdUsuario(id_usuario);
        if (existe) {
            alert(`O ID ${id_usuario} está presente no banco de dados.`);
        } else {
            alert(`O ID ${id_usuario} não está presente no banco de dados.`);
        }
    });
});

// Função para inserir dados
async function inserirUsuario(id_usuario, nome_usuario, senha_usuario) {
  try {
    const { error } = await banco_supabase
      .from('usuarios')
      .insert({ id_usuario: id_usuario, nome_usuario: nome_usuario, senha_usuario: senha_usuario });
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
            .select('id_usuario')
            .eq('id_usuario', id_usuario);

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
