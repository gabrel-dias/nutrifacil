import { PROJECT_URL, API_KEY } from './secrets.js';

const banco_supabase = supabase.createClient(PROJECT_URL, API_KEY);

document.getElementById('btnLogin').addEventListener('click', async () => {
    const email = document.getElementById('EMAIL').value;
    const senha = document.getElementById('SENHA').value;

    if (!email || !senha) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    try {
        const { data, error } = await banco_supabase
            .from('TBUsuarios')
            .select('ID, NOME, TIPOUSUARIO')
            .eq('EMAIL', email)
            .eq('SENHA', senha)
            .single();

        if (error) {
            throw error;
        }
        // verifica qual o tipo de usuário (administrador ou cliente) com as credenciais que foram digitadas
        if (data) {
            const { NOME, TIPOUSUARIO } = data;
            // armazena o nome do usuário e o seu tipo no localStorage
            localStorage.setItem('nomeUsuario', NOME);
            localStorage.setItem('tipoUsuario', TIPOUSUARIO);

            if (TIPOUSUARIO === 'A') {
                window.location.href = 'admin.html';
            } else if (TIPOUSUARIO === 'C') {
                window.location.href = 'cliente.html';
            } else {
                alert('Tipo de usuário desconhecido.');
            }
        } else {
            alert('Email ou senha incorretos.');
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert('Ocorreu um erro ao fazer login. Por favor, tente novamente.');
    }
});
