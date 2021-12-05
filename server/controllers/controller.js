var userDb = require('../model/users');

const axios = require('axios');


//get all users
exports.getUsers = (req, res) => {

    userDb.find().then(function (user) {

        res.send({ user });
    }).catch(function (err) {
        res.send({ err });
    })
}
//create a new user
exports.createUser = (req, res) => {

    let obj = {
        "nom": req.body.nom, "prenom": req.body.prenom,
        "email": req.body.email, "sexe": req.body.sexe,
        "role": req.body.role, "password": req.body.password, "insert_date": new Date()
    }


    userDb.create(obj
    ).then((user) => {
        // res.send(user);
        axios.get("http://localhost:3000/users/getAll").then(function (response) {
            // console.log(response.data.user)
            res.render('liste-users', { users: response.data.user })

        }).catch(err => {
            res.render(err);
        })


    }).catch((err) => {
        res.send({ err });
    })

    console.log(obj)
}

exports.updateUser = (req, res) => {

    let obj = {

        "nom": req.body.nom, "prenom": req.body.prenom,
        "email": req.body.email, "sexe": req.body.sexe,
        "role": req.body.role, "password": req.body.password, "insert_date": new Date()
    }


    userDb.findByIdAndUpdate(req.params.id, obj
        , { useFindAndModify: false }).then((user) => {
            // res.send(user);
            axios.get("http://localhost:3000/users/getAll").then(function (response) {
                console.log(response.data.user)
                res.render('liste-users', { users: response.data.user })

            }).catch(err => {
                res.render(err);
            })


        }).catch((err) => {
            res.send({ err });
        })

    console.log(obj)
}


exports.findById = (req, res) => {

    userDb.findById(req.params.id).then((user) => {
        res.send(user);
    }).catch((err) => {
        res.send(err);
    })

}

exports.delete = (req, res) => {

    userDb.findByIdAndDelete(req.params.id).then((user) => {
        res.send("ok");
    }).catch((err) => {
        res.send(err);
    })


}





