var setName = (name) => {
    sessionStorage.setItem("username", name)
}

var getName = () => {
    let name = sessionStorage.getItem("username")
    return name
}

var logout = () => {
    sessionStorage.removeItem("username")
}

const userProfile = {
    setName: setName,
    getName: getName,
    logout: logout
}

export default userProfile