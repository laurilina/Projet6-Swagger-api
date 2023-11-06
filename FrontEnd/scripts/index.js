const imgAjoutSrc = document.getElementById('ajout-src')
const fileUpload = document.getElementById('btn-sub-input')
const labelFileUpload = document.getElementById("btn-sub-ajout")
const fileUploadP = document.querySelector('.ajou-photo p')
const selectCategory = document.getElementById('select-category')
const formAddWork = document.getElementById('form-add-work')
const title = document.getElementById('titre')

/**
 * Method to delete project
 * 
 * @param {HTMLElement} figure 
 * @param {HTMLElement} figCaption 
 * @param {Number} id 
 */
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



/**
 * Mise à jour de la galerie en parcourant le tableau des projets data passé
 * en paramètre
 * 
 * @param {Array} data - Tableau d'ojbet data représentant la liste des projets
 * @param {HTMLElement} gallery - container gallery
 * @param {Function} callBack - method to delete element gallery on click
 */
const updateGallery = (data, gallery = galleryMain, callBack = () => { }) => {

    console.log("méthode updateGallery(data) - data:", JSON.stringify(data, null, 2))

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

const updateFilter = data => {

    // On sélectionne l'élément avec la classe 'filter' pour lui ajouter les categories récupérer de l'api
    const filter = document.querySelector(".filter")

    const button = document.createElement('button')
    button.innerHTML = 'Tous'
    filter.appendChild(button)
    button.addEventListener('click', async () => {
        const projects = await getProjects().then(data => data)
        console.log(projects)
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

    const categories = await getCategories()
    updateFilter(categories)

    // console.log("projects:", JSON.stringify(projects, null, 2))
}

init()





// Ajout d'une nouvelle image
fileUpload.addEventListener('change', () => {
    const file = fileUpload.files[0]
    imgAjoutSrc.src = URL.createObjectURL(file)
    console.log('file:', file)

    // faire disparaitre les éléments label et p
    labelFileUpload.style.display = 'none'
    fileUploadP.style.display = 'none'
})

// evenement qui se déclenche à la soumission du formulaire
formAddWork.addEventListener('submit', e => {
    // evenement pour empecher l'actualisation de la page
    e.preventDefault()

    const formData = new FormData()
    const file = fileUpload.files[0]

    const titleValue = title.value
    const selectValue = parseInt(selectCategory.value)

    formData.append('image', file)
    formData.append('title', titleValue)
    formData.append('category', selectValue)
    postWork(formData).then(() => console.log("ajout d'un nouveau travail"))

    //mettre a jour le dom, apres ajout du work

})