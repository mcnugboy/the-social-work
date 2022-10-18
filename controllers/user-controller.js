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
                res.status(400).json({message: 'No users found with this id.'});
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
    
}