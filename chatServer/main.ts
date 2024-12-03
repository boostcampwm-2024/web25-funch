import { Server } from 'socket.io';
import validate from 'utf-8-validate';
import EventEmitter from 'events';
import { Name } from './utils/name';
import { translate } from './utils/translation';

const PORT = Number(process.env.PORT) || 7990;
const io = new Server(PORT, {
  path: '/live',
  cors: {
    origin: ['http://localhost:3000', 'https://funch.site', 'https://www.funch.site'],
    methods: '*',
  },
});

const eventEmitter = new EventEmitter();
eventEmitter.setMaxListeners(Infinity);

io.on('connection', (socket) => {
  if (!socket.handshake.query.name) {
    const randomName = Name.generateRandomName();
    socket.emit('setAnonymousName', {
      name: randomName,
    });
    socket.handshake.query.name = randomName;
  }

  if (!Name.colors[socket.handshake.query.name as string]) {
    Name.colors[socket.handshake.query.name as string] = Name.generateRandomColor();
  }

  const broadcastId = socket.handshake.query.broadcastId as string;
  const chatEvent = (chatData) => {
    socket.emit('chat', {
      name: chatData.name,
      content: chatData.content,
      color: Name.colors[chatData.name],
    });
  };
  eventEmitter.on(broadcastId, chatEvent);

  socket.on('chat', async (data: Buffer) => {
    try {
      const isValidUtf8 = validate(data);
      const chatData = JSON.parse(data.toString('utf8'));
      if (isValidUtf8) {
        chatData.content = await translate(chatData.content, chatData.translation);
        eventEmitter.emit(broadcastId, chatData);
      }
    } catch (e) {
      console.log(e);
    }
  });

  socket.on('disconnect', () => {
    eventEmitter.removeListener(broadcastId, chatEvent);
  });
});
