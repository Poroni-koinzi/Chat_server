const app = require('express')();
const http = require('http').createServer(app);
var fs = require('fs');
const readline = require("readline")
const replace = require('replace-in-file');
const io = require('socket.io')(http); app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io</h1>');
});

io.on('connection', (socket) => {
  socket.on('disconnect', () => {

  });

  // Afficher tout les groupes 

  var myInterface = readline.createInterface({
    input: fs.createReadStream('groups.txt')
  });

  myInterface.on('line', function (line) {
    socket.emit("list", { line });
  });

  // Créer un group et le mettre dans la liste des groupes
  socket.on("creat", function (data) {
    //verification de l'existance du group
    fs.exists(data.room + '.txt', (exists) => {
      if (exists) {
        socket.emit("exist", { room: data.room, message: "le group " + data.room + " existe déjà" });
      } else {
        fs.appendFile(data.room + ".txt", "le group a bien été crée" + "\n", function (err) {
          if (err) throw err;
        });

        // envoie a tout les membres connecter le nouveau group crée;
        io.emit("newroom", { room: data.room });

        // mettre tout les nom des group dans le fichier groups.txt
        fs.appendFile("groups.txt", data.room + "\n", function (err) {
          if (err) throw err;
        });
      }
    });
  })
  //rejoindre le group
  socket.on("join", function (data) {
    socket.join(data.room);
    socket.emit("group", { user: data.user, room: data.room, message: " avez rejoint le group" });
    socket.broadcast.to(data.room).emit("new user joined", { user: data.user, message: "a rejoint le groupe" });

    // Envoi de toutes les conversations precedentes

    var myInterface = readline.createInterface({
      input: fs.createReadStream(data.room + '.txt')
    });

    myInterface.on('line', function (line) {
      socket.emit("tout", { line });
    });

    //Enregistrement de tout les message par group

    fs.appendFile(data.room + ".txt", data.user + ": " + "a rejoint le groupe" + "\n", function (err) {
      if (err) throw err;
    });
  })


  //quitter le group
  socket.on("leave", function (data) {
    socket.broadcast.to(data.room).emit("left room", { user: data.user, message: "a quitté le groupe" });
    socket.leave(data.room);

    //Enregistrement de tout les message par group

    fs.appendFile(data.room + ".txt", data.user + ": " + "a quitté le groupe" + "\n", function (err) {
      if (err) throw err;
    });


  })

  //Envoie de message
  socket.on("message", function (data) {
    io.in(data.room).emit("new message", { user: data.user, message: data.message });

    //Enregistrement de tout les message par group

    fs.appendFile(data.room + ".txt", data.user + ": " + data.message + "\n", function (err) {
      if (err) throw err;
    });

  })

  // renommer un group
  socket.on("edit", function (data) {
    //verifier l'existance du nouveau group
    fs.exists(data.newroom + '.txt', (exists) => {
      if (exists) {
        socket.emit("exist", { room: data.newroom, message: "le group " + data.newroom + " existe déjà" });
      } else {
        //remplacement dans fichier
        const options = {

          //Single file
          files: 'groups.txt',

          //Replacement to make (string or regex) 
          from: data.ancienroom,
          to: data.newroom,
        };

        replace(options)
          .then(changedFiles => {
          })
          .catch(error => {
          });
        //modification du fichier contenant les messages
        fs.rename(data.ancienroom + '.txt', data.newroom + '.txt', function (err) {
          if (err) throw err;
        });
      }
    })
  })

  //supprimer un group

  socket.on("supprime", function (dat) {
    fs.readFile('groups.txt', { encoding: 'utf-8' }, function (err, data) {
      if (err) throw error;

      let dataArray = data.split('\n');
      const searchKeyword = dat.room;
      let lastIndex = -1;

      for (let index = 0; index < dataArray.length; index++) {
        if (dataArray[index].includes(searchKeyword)) {
          lastIndex = index;
          break;
        }
      }

      dataArray.splice(lastIndex, 1);

      const updatedData = dataArray.join('\n');
      fs.writeFile('groups.txt', updatedData, (err) => {
        if (err) throw err;
      });

    });
    fs.unlink(dat.room + '.txt', function (err) {
      if (err) throw err;
    });
  })

});

http.listen(8080, () => {
});