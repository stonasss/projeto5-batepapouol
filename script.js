let messages = []

function userLogin() {
    const name = prompt('Qual o seu nome?');
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
    chatFeed.scrollIntoView({behavior: "smooth", block: "end"});
    chatFeed.innerHTML = '';
    for (let i = 0; i < messages.length; i++) {
        let selectedMessage = messages[i]

        if (selectedMessage.type == 'status') {

        chatFeed.innerHTML +=
        `<div class ="login">
            <h1><time>(${selectedMessage.time})</time> <strong>${selectedMessage.from}</strong> para <strong>${selectedMessage.to}</strong>: ${selectedMessage.text}</h1>
        </div>`

        } else if (selectedMessage.type == 'message') {

            chatFeed.innerHTML+=
            `<div class ="message">
                <h1><time>(${selectedMessage.time})</time> <strong>${selectedMessage.from}</strong> para <strong>${selectedMessage.to}</strong>: ${selectedMessage.text}</h1>
            </div>`

            } else if (selectedMessage.type =='private_message') {

                chatFeed.innerHTML+=
                `<div class ="private">
                    <h1><time>(${selectedMessage.time})</time> <strong>${selectedMessage.from}</strong> para <strong>${selectedMessage.to}</strong>: ${selectedMessage.text}</h1>
                </div>`

            }
        }
    }