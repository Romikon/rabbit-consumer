import * as amqp from 'amqplib';
import { json2xml } from 'xml-js';

async function consumeMessages() {
  try {
    const connection = await amqp.connect('amqps://nbedmqcr:V1iiXGjjcvVwpc29rcYw_rstIz8_vP-m@kebnekaise.lmq.cloudamqp.com/nbedmqcr');
    const channel = await connection.createChannel();
    const queue = 'test';

    await channel.assertQueue(queue, { durable: true });

    console.log("Waiting for messages");

    channel.consume(queue, (msg) => {
      if (msg) {
          const content = msg.content.toString();
          console.log(json2xml(content, { compact: true, spaces: 2 }));
      }
  }, { noAck: true });
  } catch (e) {
    console.error('Error: ', e);
  }
}

consumeMessages();
