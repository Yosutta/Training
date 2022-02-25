const func = async () => {

}

const func1 = async () => {
    return 'This Promise is resolved'
}

const func2 = async () => {
    throw new Error('This promise is rejected')
}

const login = async (username, password) => {
    if (!username && !password)
        throw ('Missing credentials')


    if (password === 'nodejs')
        return 'Welcome back'

    throw ('Incorrect password')
}

login('', '')
    .then(data => {
        console.log('Logged in!')
        console.log(data)
    })
    .catch(err => {
        console.log('Error:')
        console.log(err)
    })