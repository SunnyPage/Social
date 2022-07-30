import { Server } from 'socket.io';

const io = new Server(8900, {
  cors: {
    origin: '*',
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('addUser', (userId) => {
    addUser(userId, socket.id);
    io.emit('getUsers', users);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    removeUser(socket.id);
    io.emit('getUsers', users);
  });

  socket.on('sendMessage', (receiverId) => {
    const receiver = getUser(receiverId);
    socket.to(receiver?.socketId).emit('getMessage');
  });
});