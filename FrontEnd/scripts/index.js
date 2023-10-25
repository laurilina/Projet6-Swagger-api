const deleteWork = (figure, figCaption, id) => {
    figure.style.position = "relative"

    const trash = document.createElement('span')

    const trashSpan = document.createElement('img')
    trash.appendChild(trashSpan)
    trashSpan.src = './assets/icons/trash-can.png'
    figure.appendChild(trash)
    figCaption.innerHTML = " "

    // Quand on click sur la poubelle
    trash.addEventListener('click', async () => {
        console.log(id)
        // alors on supprime en bdd le projet par son id
        await deleteProject(id)
            // puis on actualise à nouveau la gallerie de la modale
            .then(() => getProjects())
            .then(projects => updateGallery(projects, galleryModal, deleteWork))
    })
}

const galleryMain = document.querySelector(".gallery")
const galleryModal = document.querySelector('.container-galerie')

const getProjects = () => fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .catch(error => console.error(error))

/**
 * Mise à jour de la galerie en parcourant le tableau des projets data passé
 * en paramètre
 * 
 * @param {Array} data - Tableau d'ojbet data représentant la liste des projets
 * @param {HTMLElement} gallery - container gallery
 * @param {Function} callBack - method to delete element gallery on click
 */
const updateGallery = (data, gallery = galleryMain, callBack = () => { }) => {

    /*console.log("méthode updateGallery(data) - data:", JSON.stringify(data, null, 2))*/

    //Import et selector pour div et creation des travaux
    // const gallery = document.querySelector(".gallery")

    // Supprimer tous les éléments enfants de la gallery
    gallery.innerHTML = ''

    // On parcourt chaque projet et on ajoute chaque projet à la galerie
    data.forEach(item => {
        const figure = document.createElement('figure')

        // ajout d'une image
        const img = document.createElement('img')
        img.src = item.imageUrl
        img.setAttribute('alt', item.title)
        figure.appendChild(img)

        // ajoute du texte de l'image
        const figCaption = document.createElement('figcaption')
        figCaption.innerHTML = item.title
        figure.appendChild(figCaption)

        // Methode qui permet d'ajouter une poubelle pour supprimer un projet en cliquant dessus
        callBack(figure, figCaption, item.id)

        // Le tout ajouter à la galerie
        gallery.appendChild(figure)
    });
}

fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(data => {
        /*console.log("categories:", JSON.stringify(data, null, 4))*/
        updateFilter(data)
    })
    .catch(error => console.error(error))

const updateFilter = data => {

    // On sélectionne l'élément avec la classe 'filter' pour lui ajouter les categories récupérer de l'api
    const filter = document.querySelector(".filter")

    const button = document.createElement('button')
    button.innerHTML = 'Tous'
    filter.appendChild(button)
    button.addEventListener('click', async () => {
        const projects = await getProjects()
        updateGallery(projects)
    })

    // On parcourt chaque catégorie et on ajoute chaque bouton à la div filter
    data.forEach(item => {
        const button = document.createElement('button')
        button.innerHTML = item.name
        filter.appendChild(button)

        // ajouter un événement sur le bouton
        button.addEventListener('click', async () => {
            console.log('click sur:', item.name)

            const projects = await getProjects()
            const filterDataByCategory = projects.filter(element => element.category.id === item.id)
            updateGallery(filterDataByCategory)
        })
    })
}

const init = async () => {

    const projects = await getProjects()
    updateGallery(projects)

    /*console.log("projects:", JSON.stringify(projects, null, 2))*/
}

init()

const loginA = document.getElementById('loginA')

loginA.addEventListener('click', () => {
    localStorage.removeItem('token')
})

const modal = document.querySelector('.modal')

const modal2 = document.querySelector('.modal2')
const btnModalClose = document.querySelector('.img-close img')
const btnAjoutPhoto = document.querySelector('.btn-sub')

btnModalClose.addEventListener('click', () => {
    modal.style.display = 'none'
    modal2.style.display = 'none'
})

btnAjoutPhoto.addEventListener('click', () => {
    modal.style.display = 'none'
    modal2.style.display = 'block'
})

const ajoutModal = document.querySelector('.ajout')
const mondalW = document.querySelector('.img-close-retour')
const imgRetourModal = document.createElement('img')
modal.appendChild(mondalW)
mondalW.appendChild(imgRetourModal)

imgRetourModal.src = "./assets/icons/arrow-left.png"
imgRetourModal.alt = " arrow left - retour "
imgRetourModal.addEventListener('click', () => {
    ajoutModal.style.display = 'none'
    modal.style.display = "block"
    modal2.style.display = 'none'
})


const imgCloseModal = document.createElement('img')

ajoutModal.appendChild(mondalW)
mondalW.appendChild(imgCloseModal)

imgCloseModal.src = "./assets/icons/xmark.png"
imgCloseModal.alt = " croix - fermer la modal "
imgCloseModal.addEventListener('click', () => {
    ajoutModal.style.display = 'none'
    modal2.style.display = 'none'
})

const updateConnect = () => {
    const logoutBox = document.getElementById('logout-box')

    if (localStorage.token) {
        loginA.innerHTML = "logout"
        logoutBox.style.display = 'flex'

        const imgEdit = document.createElement('img')
        logoutBox.appendChild(imgEdit)
        imgEdit.src = "./assets/icons/edit.png"
        imgEdit.alt = "icon edition"

        //partie mode edition crée
        const logoutP = document.createElement('p')
        logoutBox.appendChild(logoutP)
        logoutP.innerHTML = "Mode édition"

        //supp la partie filter
        const filterRemove = document.querySelector('.filter')
        filterRemove.style = "display: none;"

        //partie projets motifier
        const modifProjet = document.querySelector('.modifProjet')
        const modifProjetP = document.createElement('a')

        const modifImgProjet = document.createElement('img')
        modifProjet.appendChild(modifImgProjet)
        modifImgProjet.src = "./assets/icons/edit-colorblack.png"
        modifImgProjet.alt = "icon edition"

        modifProjet.appendChild(modifProjetP)
        modifProjetP.innerHTML = "modifier"
        modifProjetP.href = '#'

        const openModal = async (e) => {
            e.preventDefault()

            const projects = await getProjects()
            updateGallery(projects, galleryModal, deleteWork)

            modal.style.display = "block"
            modal.removeAttribute('aria-hidden')
            modal.setAttribute('aria-hidden', true)
        }
        modifProjetP.addEventListener('click', openModal)
    }
}

if (localStorage.token) {
    updateConnect()
}

const deleteProject = id => fetch(`http://localhost:5678/api/works/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${localStorage.token}` }
})
    .then(() => console.log(`image du work ${id} supprimée`))
    .catch(error => console.error(error))

