const handleOrder = (db) => (req, res) => {
    console.log('Request for order')
    const { id, attemptOrder } = req.body
    const address = [attemptOrder[1]]
    const items = attemptOrder[0].map(item => {
        return {
            id: item.itemid,
            name: item.itemdescription,
            price: item.itemprice,
            quan: item.attemptquantity,
            url: item.itemimage
        }
    })
    const merge = JSON.stringify([items, address])
    db('users').where('id', '=' , id)
    .update({
        orders: db.raw('array_append(orders, ?)', [merge])
    })
    .then(res.json('Ordered'))
    .catch(err => res.status(400).json('Cannot complete the order'))
}

module.exports = {
    handleOrder: handleOrder
}