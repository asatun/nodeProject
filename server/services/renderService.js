
var userDb = require('../model/users');
const axios = require('axios');

exports.getLogin = (req, res) => {


    if (req.query.status) {
        res.render('index', { 'page': 'login', 'message': 'no' })
    } else {
        res.render('index', { 'page': 'login', 'message': '' })
    }

}



exports.getAcc = (req, res) => {

    res.render('administration')
}

exports.getChatRoom = (req, res) => {

    res.render('liste-chat-room')
}


exports.getListeUsers = (req, res) => {

    axios.get("http://localhost:3000/users/getAll").then(function (response) {
        // console.log(response.data.user)
        res.render('liste-users', { users: response.data.user })

    }).catch(err => {
        res.render(err);
    })

}

exports.addUser = (req, res) => {

    res.render('add-user')
}

exports.updateUser = (req, res) => {
    console.log(req.params.id)
    axios.get("http://localhost:3000/users/find/" + req.params.id).then(function (response) {
        console.log(response.data)
        res.render('update-user', { user: response.data })

    }).catch(err => {
        res.render(err);
    })

}

exports.logout = (req, res) => {

    res.render('index', { 'page': 'login', 'message': 'logout' })
}





exports.login = (req, res) => {

    userDb.findOne({ "nom": req.body.nom, "password": req.body.password }
    ).then((user) => {

        if (user != null) {

            console.log("******Connected ********")
            res.send('ok')

        } else {
            res.send('no')
        }


    }).catch((err) => {
        console.log('error')
        res.render('index', { 'page': 'login', 'message': 'no' })
    })


}







