const handleNewsList = (db) => (req, res) => {
    console.log('Request for news list')
    db.select('*').from('newslist')
      .then(data => res.json(data))
      .catch(err => res.status(400).json('Cannot retrieve any news'))
}

module.exports = {
    handleNewsList: handleNewsList
}