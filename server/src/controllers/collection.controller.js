const db = require('../db/db')

class CollectionController {
    async createCollection(req, res) {
        const userID = req.userID
        const {name} = req.body
        const createDate = Date.now()
        db.query('INSERT INTO collections(userID, name, createDate, repeatDates) values(?, ?, ?, ?)', [userID, name, createDate, JSON.stringify(getRepeatDates(createDate))])
        .then(response => {
            console.log(response)
            res.json(response)
        })
        .catch(err => {
            console.log(err)
            res.json(err.message)
        })
    }

    async getCollections(req, res) {
        const userID = req.userID
        db.query("SELECT * FROM collections WHERE userID = ?", [userID])
        .then(data => {
            const collectionsArray = data[0]
            const collections = sortCollections(collectionsArray)

            res.json(collections)
        })
    }
}

function sortCollections(collectionsArray) {
    const today = (new Date()).toLocaleDateString()
    const collection = {
        today: [],
        late: [],
        notStarted: [],
    }
    collectionsArray.forEach(i => {
        let item = i
        if(i.repeatDates !== "not started") {
            item = {...i, repeatDates: JSON.parse(i.repeatDates)}
        }
        if(item.repeatDates === "not started") {
            collection.notStarted.push(item)
        } else {
            const repeatArrDates = item.repeatDates.map(date => {
                return (new Date(date)).toLocaleDateString()
            })
            if(repeatArrDates.includes(today)) {
                collection.today.push(item)
            } else {
                collection.late.push(item)
            }
        }
        
    })
    return collection
}


function getRepeatDates(createDate) {
    const repeatArrDates = [];
    for(let i = 3; i <= 243; i = i * 3) {
        const date = new Date(createDate);
        date.setDate(date.getDate() + i);
        repeatArrDates.push(date.getTime());
    };
    return repeatArrDates;
}

module.exports = new CollectionController()
