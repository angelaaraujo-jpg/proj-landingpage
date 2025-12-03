// script.js

// 1. Identificar o formulário
const form = document.querySelector('form'); // Supondo que você só tenha um <form>

// 2. Identificar a área para mostrar a mensagem
const messageDisplay = document.createElement('p');
messageDisplay.id = 'message-area';
form.parentNode.insertBefore(messageDisplay, form.nextSibling);

// 3. Adicionar um "ouvinte" de evento para quando o formulário for enviado
form.addEventListener('submit', async (event) => {
    // 4. Parar o comportamento padrão (impede o recarregamento da página)
    event.preventDefault(); 
    
    // Limpa a mensagem anterior
    messageDisplay.textContent = '';
    messageDisplay.style.color = 'black'; // Cor padrão

    // 5. Coletar os dados do formulário
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Você precisa dos nomes dos campos (name, email, course) do seu HTML
    // O back-end espera estes dados (name, email, course) no corpo da requisição.

    try {
        // 6. Enviar os dados como JSON para o seu back-end
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Informa ao servidor que estamos enviando JSON
            },
            body: JSON.stringify(data), // Converte o objeto JS para uma string JSON
        });

        const result = await response.json(); // Tenta ler a resposta JSON do servidor

        // 7. Processar a resposta do servidor
        if (response.ok) {
            // Se o status HTTP for 200 (Sucesso)
            messageDisplay.textContent = result.message;
            messageDisplay.style.color = 'green';
            form.reset(); // Limpa o formulário em caso de sucesso
            console.log('Sucesso do Servidor:', result.data);
        } else {
            // Se o status HTTP for 400 (Erro de validação, etc.)
            messageDisplay.textContent = `Erro: ${result.message}`;
            messageDisplay.style.color = 'red';
            console.error('Erro do Servidor:', result);
        }

    } catch (error) {
        // Caso a requisição falhe completamente (servidor offline, erro de rede, etc.)
        messageDisplay.textContent = 'Erro de rede: Não foi possível conectar ao servidor.';
        messageDisplay.style.color = 'red';
        console.error('Erro de Fetch:', error);
    }
});