let messages = []
let userName = ""

function userLogin() {
    userName = prompt('Qual o seu nome?');
    
    const data = {name: userName};
    
    const promiseName = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', data);

    promiseName.then(serverMessages);
    promiseName.catch(nameUsed);

    setInterval(() => {
        const promiseName = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', data);
    }, 5000);
}

function nameUsed(){
    alert('Esse nome de usuário está indisponível');
    userLogin();
}

function sendMessage() {    
    messageTyped = document.querySelector('input').value;
    const data = {from: userName, to: 'Todos', text: messageTyped, type: 'message'};

    const promiseMsg = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', data);

    if (messageTyped = '') {
        return false;
    } else {
        document.querySelector('input').value='';
    }
}

function serverMessages() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    console.log(promise);
    promise.then(messagesSent);

    loadChat();
}

setInterval(function serverMessages() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    console.log(promise);
    promise.then(messagesSent);

    loadChat();
}, 3000);

function messagesSent(response) {
    console.log(response.data);

    messages = response.data;

    loadChat();
}

function loadChat() {
    const chatFeed = document.querySelector('.chat');
    
    chatFeed.innerHTML = '';
    for (let i = 0; i < messages.length; i++) {
        let selectedMessage = messages[i]

        if (selectedMessage.type == 'status') {

        chatFeed.innerHTML +=
        `<div class ="login">
            <h1>
                <time>(${selectedMessage.time})</time>
                <strong>${selectedMessage.from}</strong> ${selectedMessage.text}
            </h1>
        </div>`

        } else if (selectedMessage.type == 'message') {

            chatFeed.innerHTML+=
            `<div class ="message">
                <h1>
                    <time>(${selectedMessage.time})</time>
                    <strong>${selectedMessage.from}</strong> para
                    <strong>${selectedMessage.to}</strong>: ${selectedMessage.text}
                </h1>
            </div>`

            } else if (selectedMessage.type =='private_message') {
                if (selectedMessage.to == userName) {
                    chatFeed.innerHTML+=
                `<div class ="private">
                    <h1>
                        <time>(${selectedMessage.time})</time>
                        <strong>${selectedMessage.from}</strong> para
                        <strong>${selectedMessage.to}</strong>: ${selectedMessage.text}
                    </h1>
                </div>`
                } else {
                    return false;
                }
            }
        }
    if (chatFeed.lastElementChild !== messages.length -1) {
        chatFeed.lastElementChild.scrollIntoView({behavior: "smooth"});
    } 
}
