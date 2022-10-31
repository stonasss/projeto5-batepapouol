let messages = []
let userName = ""

function userLogin() { //função que registra o nome do usuário
    userName = prompt('Qual o seu nome?');
    
    const data = {name: userName};  //criação do objeto que será enviado à API
    
    const promiseName = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', data);

    promiseName.then(serverMessages);  //se o nome escolhido não estiver em uso
    promiseName.catch(nameUsed);  //se o nome escolhido estiver em uso

        setInterval(() => {  //enquanto o usuário estiver com a página aberta, ele não sai da sala
            const promiseName = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', data);
        }, 5000);
}

    function nameUsed(){  //a função que se aplica quando o nome inserido já está em uso
        alert('Esse nome de usuário está indisponível');
        userLogin();  //retorna para a função que pede o nome de usuário
    }

function serverMessages() {  //função que busca o array de 100 mensagens da API
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(messagesSent);  

    loadChat();
}

    setInterval(function serverMessages() {  //a cada 3 segundos a função de buscar mensagens se repete
        const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
        promise.then(messagesSent);

        loadChat();
    }, 3000);

    function messagesSent(response) {  //a função que insere as msgs da API dentro da variável global
        messages = response.data;
        console.log(messages); //para ver as mensagens que chegam do API pelo console do browser
        loadChat();
    }

function sendMessage() {  //função que envia mensagem à API
    messageTyped = document.querySelector('input').value;  //insere o input do usuário numa variável
    const data = {from: userName, to: 'Todos', text: messageTyped, type: 'message'};  //criação do objeto que contém a mensagem digitada que será enviada para a API

    const promiseMsg = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', data);  //envio da mensagem à API
    promiseMsg.then(refreshChat);

    if (messageTyped = '') {  //se o input estiver vazio, nada é enviado
        return false;
    } else {  //quando o input não estiver vazio, a mensagem é enviado e logo em seguida o que foi digitado é apagado do input
        document.querySelector('input').value='';
    }
}

    function refreshChat() {  //função que reinicia a função que chama as mensagens da API quando uma mensagem é enviada
        serverMessages();
        document.querySelector('input').value='';
    }

function loadChat() {  //a função que insere as mensagens da API na interface do bate-papo
    const chatFeed = document.querySelector('.chat');
    
    chatFeed.innerHTML = '';
    for (let i = 0; i < messages.length; i++) {
        let selectedMessage = messages[i]

        if (selectedMessage.type == 'status') {  //quando o usuário entra/sai da sala

        chatFeed.innerHTML +=
        `<div class ="login">
            <h1>
                <time>(${selectedMessage.time})</time>
                <strong>${selectedMessage.from}</strong> ${selectedMessage.text}
            </h1>
        </div>`

        } else if (selectedMessage.type == 'message') {  //quando o usuário envia mensagem

            chatFeed.innerHTML+=
            `<div class ="message">
                <h1>
                    <time>(${selectedMessage.time})</time>
                    <strong>${selectedMessage.from}</strong> para
                    <strong>${selectedMessage.to}</strong>: ${selectedMessage.text}
                </h1>
            </div>`

            } else if (selectedMessage.type =='private_message') {  //quando o usuário envia mensagem privada
                if (selectedMessage.to == userName) {  //caso o destinatário da mensagem colhida da API seja o próprio usuário utilizando o bate-papo, a mensagem é mostrada
                    chatFeed.innerHTML+=
                `<div class ="private">
                    <h1>
                        <time>(${selectedMessage.time})</time>
                        <strong>${selectedMessage.from}</strong> para
                        <strong>${selectedMessage.to}</strong>: ${selectedMessage.text}
                    </h1>
                </div>`
                }
            }
        }
    if (chatFeed.lastElementChild !== messages.length -1) {  //a condição que faz a página descer para o fim quando uma mensagem nova chega
        chatFeed.lastElementChild.scrollIntoView({behavior: "smooth"});
    }
}

//para enviar mensagem apertando enter:

function search(element) {
    if (event.key ==='Enter') {
        messageTyped = document.querySelector('input').value;
        const data = {from: userName, to: 'Todos', text: messageTyped, type: 'message'};

        const promiseMsg = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', data);
        promiseMsg.then(refreshChat);
    }
}