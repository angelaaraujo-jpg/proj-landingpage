const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;
const DB_FILE = path.join(__dirname, 'data.json'); 

// --- Middlewares ---

// Serve os arquivos estáticos da pasta 'public' (HTML, CSS, JS, Imagens)
app.use(express.static(path.join(__dirname, 'public')));

// Habilita o CORS para todas as rotas (permite requisições do front-end)
const cors = require('cors');
app.use(cors());

// Permite que o Express leia dados de formulários (POST) enviados via URL-encoded
app.use(express.urlencoded({ extended: true })); 

// Permite que o Express leia dados JSON no corpo das requisições (se for usado fetch/AJAX)
app.use(express.json());

// --- Rota POST para receber os dados do formulário ---

// Esta rota espera os campos 'name', 'email' e 'phone' do formulário
app.post('/register', (req, res) => {
  console.log('Recebida nova requisição /register');
  console.log('Corpo da requisição:', req.body);

  // A desestruturação agora usa 'name', 'email' e 'phone' (telefone)
  const { name, email, phone } = req.body;

  // --- Validação básica no back-end ---
  // CORREÇÃO: Sintaxe consertada e validação focada nos campos obrigatórios (name e email)
  if (!name || !email) { 
    console.log('Erro: Campos obrigatórios (Nome e E-mail) faltando.');
    return res.status(400).json({
      status: 'error',
      message: 'Erro no servidor: Nome e E-mail são campos obrigatórios.',
    });
  }

  // Validação simples de e-mail
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    console.log('Erro: E-mail inválido.');
    return res.status(400).json({
      status: 'error',
      message: 'Erro no servidor: Formato de e-mail inválido.',
    });
  }

  // --- Simulação de Armazenamento ---
  const newRegistration = {
    name,
    email,
    phone, // Registra o telefone (campo opcional no formulário)
    registeredAt: new Date().toISOString(),
  };

  console.log('Validação OK. Simulando armazenamento...');

  // Lendo o arquivo JSON atual
  fs.readFile(DB_FILE, 'utf8', (err, data) => {
    let registrations = [];
    if (!err && data) {
      try {
        registrations = JSON.parse(data);
        if (!Array.isArray(registrations)) {
          registrations = [];
        }
      } catch (parseError) {
        console.error('Erro ao parsear data.json, iniciando com array vazio.', parseError);
        registrations = [];
      }
    }

    // Adicionando o novo registro
    registrations.push(newRegistration);

    // Escrevendo de volta no arquivo
    fs.writeFile(DB_FILE, JSON.stringify(registrations, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Erro ao salvar no arquivo data.json:', writeErr);
      } else {
        console.log('Dados salvos com sucesso em data.json');
      }

      // --- Resposta de Sucesso ---
      res.status(200).json({
        status: 'success',
        message: 'Inscrição recebida com sucesso! Entraremos em contato em breve.',
        data: newRegistration,
      });
    });
  });
});


// --- Iniciar o servidor ---
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    console.log(`Pressione CTRL+C para parar.`);
});