import express from 'express';  

const app = express()

const port = 3000

app.use(express.json())

let teaData = []
let nextId = 1

//Add a new tea
app.post('/teas', (req, res) => {
    const { name, price } = req.body
    const newTea = { id: nextId++, name, price }
    teaData.push(newTea)
    res.status(201).send(newTea)
})

//Get all tea
app.get('/teas', (req, res) => {
    res.status(200).send(teaData)
})

//Get tea with id
app.get('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send('Tea not found')
    } else {
        return res.status(200).send(tea)
    }
})

//Update tea
app.put('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send('Tea not found')
    } else {
        tea.name = req.body.name || tea.name
        tea.price = req.body.price || tea.price
        res.status(200).send(tea)
    }
})

//Delete tea
app.delete('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if (tea === -1) {
        return res.status(404).send('Tea not found')
    } else {
        teaData = teaData.filter(t => t.id !== parseInt(req.params.id))
        return res.status(200).send('Tea deleted')
    }
})

app.listen(port, () => {
    console.log(`listening on port ${port}!`)
})
