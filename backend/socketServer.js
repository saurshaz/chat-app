const clients = {};
const messages = [];
const sio = require('socket.io');

module.exports = (server) => {
  const io = sio.listen(server);

  io.on('connection', (socket_) => {
    const socket = socket_;

    // Connecting
    socket.on('signIn', (msg) => {
      let uid = msg.uid || undefined;
      let nickname = msg.nickname || undefined;

      // Check if user already connected
      if (uid !== undefined && uid in clients) {
        clients[uid].connections.push(socket.id);
      } else {
        // Else check, is he already has a nickname and uid
        // And generate them if needed
        if (uid === undefined) {
          do {
            uid = `u${Math.floor(Math.random() * 10000000)}`;
            while (uid.length < 8) {
              uid += '0';
            }
          } while (clients[uid]);
        }

        if (nickname === undefined) {
          nickname = `Anonimous user #${uid.slice(1)}`;
        }

        clients[uid] = {
          nickname,
          connections: [socket.id]
        };


        socket.broadcast.emit('userConnected', {
          nickname: clients[uid].nickname,
          uid
        });
      }

      socket.uid = uid;
      socket.nickname = clients[uid].nickname;

      const allUids = Object.keys(clients);
      const usersList = [];

      allUids.forEach((uid$) => {
        if (uid$ !== socket.uid) {
          usersList.push({
            uid$,
            nickname: clients[uid$].nickname
          });
        }
      });


      socket.emit('connected', {
        uid: socket.uid,
        nickname: socket.nickname,
        usersList,
        messages
      });

    });

    socket.on('disconnect', () => {
      // const time = new Date();
      // const rawTime = time.getTime();
      const uid = socket.uid;
      const nickname = socket.nickname;

      if (clients[uid] && clients[uid].connections.length === 1) {
        io.sockets.emit('userDisconnected', {
          nickname,
          uid
        });

        delete clients[uid];
      } else if (clients[uid]) {
        clients[uid].connections
          = clients[uid].connections.splice((clients[uid].connections.indexOf(uid)), 1);
      }
      // console.log(clients);
    });

    // Events
    socket.on('message', (msg) => {
      const nickname = socket.nickname;
      const time = new Date();
      const rawTime = time.getTime();
      const message = {
        name: nickname,
        text: msg,
        time: rawTime
      };
      messages.push(message);
      io.emit('messageReceived', message);
    });

    socket.on('nicknameChange', (msg) => {
      let nicknameTemp = msg.nickname;

      nicknameTemp = nicknameTemp.length > 32 ? nicknameTemp.slice(0, 31) : nicknameTemp;

      socket.nickname = clients[socket.uid].nickname;
      socket.nickname = nicknameTemp;

      socket.emit('nicknameChangeSuccess', {
        nickname: socket.nickname
      });

      socket.broadcast.emit('userChangedNickname', {
        nickname: socket.nickname,
        uid: socket.uid
      });
    });
  });
};
