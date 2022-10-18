const { User, Thought } = require('../models');
const userControl = {
    getAllUser({ params }, res) {
        User.find({ })
        .then((dbUserdata) => res.json(dbUserdata))
        .catch((err) => res.status(500).json(err))
    },
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        
    }
}