const rabbit = require('amqplib');
const util = require('util')
const axios = require('axios')

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
        let msge;
        const createConection = await rabbitResponse.createChannel();
        //console.log(createConection)
        const ok = await createConection.assertQueue(q);
        console.log(ok)
        if(ok){            
            //const consume = await createConection.consume(q);
            //console.log(consume)
            await createConection.consume(q, msg => {
                if(msg != null){
                    let respo =  JSON.parse(msg.content.toString())                    
                    /* if(respo.id === 4){
                        msge = msg;
                        
                    } //return createConection.ack(msg); */
                    //console.log("No es id 1")
                    console.log(respo)
                    //util.promisify()
                }
            })
            //createConection.ack(msge);
            /* if(JSON.parse(msge.content.toString()).id == 4){
                const {data} = await axios.get('https://jsonplaceholder.typicode.com/posts');
                console.log(data)
            } */
            const {data} = await axios.get('https://jsonplaceholder.typicode.com/posts');
            console.log(data)
        }                
    } catch (error) {
        console.log('Error para conectar rabbit', error.mesage)
    }
}

connection();