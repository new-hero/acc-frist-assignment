const http = require('http');
const fs = require('fs');
let users = require('./users.json')


const server = http.createServer((req, res) => {

    const handleReadFile = () => {
        fs.readFile("./users.json", "utf-8", (err, data) => {
            if (err) {
                res.write("failed to data load")
                res.end()
            } else {
                res.write(data)
                res.end()
            }
        });
    }
    const handleSaveUser = () => {
        const id = users.length + 1
        const newUser = {
            id: id,
            name: req.headers.name,
            gender: req.headers.gender,
            contact: req.headers.contact,
            address: req.headers.address,
            photoUrl: req.headers.photourl
        }
        users.push(newUser)
        res.write(JSON.stringify(newUser))
        res.end()
    }
    const handleUpdateUser = () => {
        const id = req.headers.id;
        const result = users.find(user => user.id == id)
        const remainingUser = users.filter(user => user.id !== result.id)
        
        const UpdatedUser = {
            id: id,
            name: req.headers.name,
            gender: req.headers.gender,
            contact: req.headers.contact,
            address: req.headers.address,
            photoUrl: req.headers.photourl
        }
        res.write(JSON.stringify(UpdatedUser))
        users = [...remainingUser, UpdatedUser]

        res.end()
    }
    const handleDeleteUser=()=>{
        const id = req.headers.id;
        const result = users.find(user => user.id == id)
        const remainingUser = users.filter(user => user.id !== result.id)
        users= [...remainingUser]
        res.end(`user delete successful id no is ${id}`)
    }

    const handleRandomUser =()=>{
        let x = Math.floor((Math.random() * users.length) );
        let randomUser=users[x]
        
        res.end(JSON.stringify(randomUser))
    }





    if (req.url == "/") {
        res.end("welcome to Random User api")
    }
    else if (req.url == '/user/all') {
        handleReadFile();
    }

    else if (req.url == '/user/save') {
        handleSaveUser()
    }
    else if (req.url == '/user/update') {
        handleUpdateUser();
    }
    else if (req.url == '/user/bulk-update') {
        res.end("i am from bulk update")
    }
    else if (req.url == '/user/delete') {
        handleDeleteUser()
    }
    else if (req.url == '/user/random') {
        handleRandomUser()
    }
    else {
        res.end("No Route found")
    }
});
const PORT = process.env.PORT || 5000;

server.listen(PORT); 