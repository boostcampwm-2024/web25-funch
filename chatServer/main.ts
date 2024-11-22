import { Server } from 'socket.io';
import validate from 'utf-8-validate';
import EventEmitter from 'events';
import { generateRandomName } from './utils/name';

const PORT = 7990;
const io = new Server(PORT, {
  path: '/live',
  cors: {
<<<<<<< HEAD
    origin: ['localhost', 'https://funch.site', 'https://www.funch.site'],
=======
    // origin: 'https://www.funch.site',
    origin: '*',
>>>>>>> b16a3be0 (refactor: types)
    methods: '*',
  },
});

const eventEmitter = new EventEmitter();
eventEmitter.setMaxListeners(Infinity);

io.on('connection', (socket) => {
  if (!socket.handshake.query.name) {
    socket.emit('setAnonymousName', {
      name: generateRandomName(),
    });
  }

  const broadcastId = socket.handshake.query.broadcastId as string;
  const chatEvent = (chatData) => {
    socket.emit('chat', {
      name: chatData.name,
      content: chatData.content,
    });
  };
  eventEmitter.on(broadcastId, chatEvent);

  socket.on('chat', (data: Buffer) => {
    try {
      const isValidUtf8 = validate(data);
      const chatData = JSON.parse(data.toString('utf8'));
      if (isValidUtf8) eventEmitter.emit(broadcastId, chatData);
    } catch (e) {
      console.log(e);
    }
  });

  socket.on('disconnect', () => {
    eventEmitter.removeListener(broadcastId, chatEvent);
  });
});
