const { User, Thought } = require('../models');
const userControl = {
    getAllUser({params}, res) {
        User.find({ })
        .then((dbUserdata) => res.json(dbUserdata))
        .catch((err) => res.status(500).json(err))
    },
    getUserById({params}, res) {
        User.findOne({_id: params.id})
        .populate('thoughts')
        .populate('friends')
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserdata) {
                res.status(400).json({message: 'No users have been found with this id.'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    createUser({body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err))
    },
    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'No users have been found with this id.'});
                return;
            }
            Thought.deleteMany({_id: {}});
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    updateUser({params}, res) {
        User.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No users have been found with this id.'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

};

module.exports = userControl;