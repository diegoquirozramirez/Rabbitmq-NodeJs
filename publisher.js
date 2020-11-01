const rabbit = require('amqplib');

/* const message = [
    {'id': 1, 'name': 'diego quiroz'},
    {'id': 2, 'name': 'mihcale espinoza'},
    {'id': 3, 'name': 'hans hans'},
    {'id': 4, 'name': 'joel joel'},
    {'id': 5, 'name': 'diego parede'}
] */

const message = {
    "id": 1,
    "nombres": "diego",
    "apellidos": "quiroz"
}

connection = async () => {
    try {
        const rabbitResponse = await rabbit.connect({
            protocol: 'amqp',
            hostname: 'your_host',
            port: null,
            vhost: '/',
            username: 'your_user',
            password: 'your_pass',
            authMechanism: ["PLAIN","AMQPLAIN","EXTERNAL"]
        })
        var q = 'your_name_queue'
        const chanel = rabbitResponse.createChannel();
        const ok = (await chanel).assertQueue(q);
        if(ok){
            (await chanel).sendToQueue(q, Buffer.from(JSON.stringify(message)))
            //message.map(v => (await chanel).sendToQueue(q, Buffer.from(v)))
            /* for(let me in message){
                //console.log(JSON.stringify(message[me]))
                (await chanel).sendToQueue(q, Buffer.from(JSON.stringify(message[me])))
            } */
            console.log("Se enviaron a la cola Task")
        }else{
            console.log('No envio nada?')
        } //return (await chanel).sendToQueue(q, Buffer.from('Hello World'))

        
    } catch (error) {
        console.log('Error para conectar rabbit'. error)
    }
}

connection();