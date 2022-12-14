const { User, Thought } = require('../models');
const thoughtControl = {
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .sort({_id: -1})
        .then((dbThoughtData) => {
            res.json(dbThoughtData)
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err)
        })
    },
    getThoughtById({params}, res) {
        Thought.findOne({_id: params.id})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'No thoughts have been found with this id.'});
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err)
        })
    },
};

module.exports = thoughtControl;