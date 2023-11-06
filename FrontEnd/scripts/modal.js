//MISE A JOUR DE LA MODAL APRES LOGIN
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

const resetModal2 = () => {
    imgAjoutSrc.src = './assets/icons/picture.png'
    labelFileUpload.style.display = 'block'
    fileUploadP.style.display = 'block'
}


const createSelectCategory = async () => {
    const categories = await getCategories()
    categories.forEach(item => {
        const option = document.createElement('option')
        option.value = item.id
        option.innerHTML = item.name
        selectCategory.appendChild(option)
    })
}

btnAjoutPhoto.addEventListener('click', () => {
    modal.style.display = 'none'
    modal2.style.display = 'block'
    resetModal2()
    createSelectCategory()
})

const ajoutModal = document.querySelector('.ajout')
const mondalW = document.querySelector('.img-close-retour')
const imgRetourModal = document.createElement('img')
modal.appendChild(mondalW)
mondalW.appendChild(imgRetourModal)

imgRetourModal.src = "./assets/icons/arrow-left.png"
imgRetourModal.alt = " arrow left - retour "
imgRetourModal.addEventListener('click', () => {
    modal.style.display = "block"
    modal2.style.display = 'none'
})


const imgCloseModal = document.createElement('img')

ajoutModal.appendChild(mondalW)
mondalW.appendChild(imgCloseModal)

imgCloseModal.src = "./assets/icons/xmark.png"
imgCloseModal.alt = " croix - fermer la modal "
imgCloseModal.addEventListener('click', () => {
    ajoutModal.style.display = 'flex'
    mondalW.style.display = 'flex'
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