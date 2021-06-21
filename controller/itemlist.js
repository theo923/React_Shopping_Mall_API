const handleItemList = (db) => (req, res) => {
    console.log('Request for item list')
    const { name } = req.body
    db('itemlist').select('*').where('itemname', '=' , name)
    .then(order => res.json(order[0]))
    .catch(res.status(400).json('Cannot retrieve any items'))

}

module.exports = {
    handleItemList: handleItemList
}