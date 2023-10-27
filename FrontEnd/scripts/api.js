// Import fecth !

const WORK_URL = "http://localhost:5678/api/works"
const CATEGORY_URL = "http://localhost:5678/api/categories"
const LOGIN_URL = 'http://localhost:5678/api/users/login'

const get = url => fetch(url).then(response => response.json()).catch(error => console.error(error))

const getProjects = () => get(WORK_URL)
const getCategories = () => get(CATEGORY_URL)



    // Fetch data login
const postLogin = data => fetch(LOGIN_URL, {
    method: 'post',
    headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
}).then(res => res.json())



    // Fetch Delete id work
const deleteProject = id => fetch(`${WORK_URL}/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${localStorage.token}` }
})
    .then(() => console.log(`image du work ${id} supprimée`))
    .catch(error => console.error(error))



    // Fetch post add work
const addWork = id => fetch(`${WORK_URL}/${id}`, {
    method: 'POST',
    headers: {
    'accept': 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(
        {
            title: ' ',
            image: src,
            category: 'select'
        }
    )
})
    .then(() => console.log(`image du work ${id} add`))
    .catch(error => console.error(error))

    