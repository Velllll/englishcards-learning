const db = require('../db/db')

class CardsController {
    async createCard(req, res) {
        const userID = req.userID
        const {collectionID, frontSide, backSide} = req.body
        db.query('INSERT INTO cards(collectionID, userID, frontSide, backSide) values(?, ?, ?, ?)', [
            collectionID,
            userID, frontSide,
            backSide
        ])
        .then(() => {
            res.json({message: "card created"})
        })
        .catch(err => {
            console.log(err)
        })
    }

    async getCards(req, res) {
        const userID = req.userID
        const collectionID = req.params.collectionID
        db.query("SELECT * FROM cards WHERE collectionID = ? AND userID = ?", [collectionID, userID])
        .then(data => {
            const cards = data[0]
            res.json(cards)
        })
        .catch(err => {
            console.log(err)
        })
    }

    async getCard(req, res) {
        const userID = req.userID
        const cardID = req.params.cardID
        db.query("SELECT * FROM cards WHERE cardID = ? AND userID = ?", [cardID, userID])
        .then(data => {
            const card = data[0]
            res.json(card[0])
        })
        .catch(err => {
            console.log(err)
        })
    }

    async getAllCards(req, res) {
        const userID = req.userID
        db.query("SELECT * FROM cards WHERE userID = ?", [userID])
        .then(data => {
            const cards = data[0]
            res.json(cards)
        })
        .catch(err => {
            console.log(err)
        })
    }
}

module.exports = new CardsController()