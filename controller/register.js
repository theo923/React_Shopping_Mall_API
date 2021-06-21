const handleRegister = (db, bcrypt) => (req, res) => {
    const { username, password } =  req.body
    const hash = bcrypt.hashSync(password)
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            username: username
        })
        .into('login')
        .returning('username')
        .then(loginUsername => {
            return trx('users')
            .returning('*')
            .insert({
                username: loginUsername[0],
                joined: new Date(),
                orders: []
            })
            .then(user => {
                console.log(`${username} Registered.`)
                res.json(user[0])
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })

}

module.exports = {
    handleRegister: handleRegister
}