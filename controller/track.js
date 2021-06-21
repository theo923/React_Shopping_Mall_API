const handleTrack = (db) => (req, res) => {
    console.log('User request for viewing orders')
    const { username } = req.body
    db.select('orders').from('users').where('username', '=' , username)
    .then(order => {
        const renderedOrder = order[0].orders.map(order => JSON.parse(order.replace(/\\/g, "")))
        res.json(renderedOrder)
    })
    .catch(err => res.json('error in getting user orders'))
}

module.exports = {
    handleTrack: handleTrack
}