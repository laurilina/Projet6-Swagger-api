
const email = document.getElementById('email')
const password = document.getElementById('motdepass')
const form = document.querySelector('.formulaire-login')

form.addEventListener('submit', e => {
    e.preventDefault()
    console.log('email:', email.value)
    console.log('password:', password.value)

    postLogin({
        "email": email.value,
        "password": password.value
    })
        .then(data => {
            console.log(JSON.stringify(data, null, 2))
            localStorage.token = data.token
            identification(data)
        })
        .catch(error => console.error(error))
})

const identification = data => {
    if (localStorage.token = data.token) {
        window.location = "../index.html"
        // updateConnect()
    } else {
        // console.error(`Erreur lors de l'identification : ${error.message}`)
        alert("Erreur dans l’identifiant ou le mot de passe")
    }
}
