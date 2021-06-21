const handleSignIn = (db, bcrypt) => (req, res) => {
    console.log('Request for user sign in')
    db('login').select('*')
        .where('username','=', req.body.username)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash) || false
            if(isValid) {
                return db('users').select('*')
                    .where('username','=', req.body.username)
                    .then(user => {
                        console.log(user[0].username, 'Logged In' )
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('Something went wrong'))
            }
            else res.status(400).json('Wrong username or password')
        })
        .catch(err => res.status(400).json('Wrong username or password'))
    
}

module.exports = {
    handleSignIn: handleSignIn
}