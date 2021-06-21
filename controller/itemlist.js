const handleItemList = (db) => (req, res) => {
    console.log(req.body)
    const { name } = req.body
    db('itemlist').select('*').where('itemname', '=' , name)
    .then(order => {
        res.json(order[0])
    })

}

module.exports = {
    handleItemList: handleItemList
}