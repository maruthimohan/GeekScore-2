
const express = require('express')
const Team = require('../../models/team');
const router = express.Router();

router.get('/', async (req, res) => {
    const user = req.query.user
    try {
        const teams = await Team.find({ user });
        res.json(teams);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/game', async (req, res) => {
    const user = req.query.user
    const gameId = req.query.gameId
    try {
        const teams = await Team.find({ user });
        const gameTeams = teams.filter(team => team.games.includes(gameId))
        res.json(gameTeams);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const { name, coop, favorite, id, players, user, rounds, games } = req.body
    const team = new Team({
        id,
        name,
        user,
        games,
        coop,
        favorite,
        players,
        rounds
    });
    try {
        const newTeam = await team.save();
        res.status(201).json(newTeam);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await Team.findByIdAndRemove(req.params.id);
        res.status(200).json({ state: 'deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        await Team.findByIdAndUpdate(req.params.id, req.body);
        res.json({ state: 'updated' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


module.exports = router;