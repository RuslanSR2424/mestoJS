// Отслеживаемые элементы 

let ProfileEdit = document.querySelector ('.profile__button-edit');
let popupFormProfile = document.querySelector ('.popup-form-profile');
let buttonClose = document.querySelector ('.popup-profile__close');

let popupFormCard = document.querySelector ('.popup-elements');
let CardEdit = document.querySelector ('.profile__button-add');
let CardClose = document.querySelector ('.popup-elements__close');
let ProfileName = document.querySelector ('.profile__user-name');
let ProfileDescription = document.querySelector ('.profile__description');
let ImageContainer = document.querySelector ('.element-open-img__container');

let ImageOpen = document.querySelector ('.element-open-img');
let Card = document.querySelector ('.element-list__item');

let ElementList = document.querySelector('.element-list');
let ElementTemplate = document.querySelector('.element-template').content;

let popupItemPlace = popupFormCard.querySelector('.popup__item-place');
let popupItemPicture = popupFormCard.querySelector('.popup__item-picture');




//карточки
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
    ];

// изменения профиля

ProfileEdit.addEventListener('click', () => {
  popupProfileOpen();
  nameInput.value = ProfileName.textContent;
  descriptionInput.value = ProfileDescription.textContent;
});
//Отслеживаем поля вводимых данных в попап профиля
let nameInput = popupFormProfile.querySelector ('.popup__item-name');
let descriptionInput = popupFormProfile.querySelector ('.popup__item-description');
// Присваивание вводимых данных новому имени и подзаголовка для профиля
function changeProfileInfo(evt) {
  evt.preventDefault();
  ProfileName.textContent = nameInput.value;
  ProfileDescription.textContent = descriptionInput.value;
  popupProfileClose();
}

popupFormProfile.addEventListener('submit', changeProfileInfo);

//Открываем и закрываем попап профиля

function popupProfileOpen () {
    popupFormProfile.classList.add('popup_opened'); 
}


function popupProfileClose (){
    popupFormProfile.classList.remove('popup_opened');
}

buttonClose.addEventListener('click', popupProfileClose);


//Открываем и закрываем попап вводимых данных для новой карточки

function popupCardOpen (){
    popupFormCard.classList.add('popup_opened');
}

CardEdit.addEventListener('click', popupCardOpen);

function popupCardClose (){
    popupFormCard.classList.remove('popup_opened');
}

CardClose.addEventListener('click', popupCardClose);

// Добавление карточки


function CreateElement(element, container) {
  container.prepend(element);
};

function CreateNewElement(elementName, elementUrl) {
    let Cards = ElementTemplate.cloneNode(true);
    //Присваиваем ссылки и наименование карточек из массива для нашей заготовки под карточки
    Cards.querySelector('.element-list__img').src = elementUrl;
    Cards.querySelector('.element-list__img').alt = elementName;
    Cards.querySelector('.element-list__title').textContent = elementName;
    //Отслеживание Лайка, Удаления, и Самой картинки
    let like = Cards.querySelector('.element-list__like');
    let image = Cards.querySelector('.element-list__img');
    let DeleteElement = Cards.querySelector ('.element-list__delete');
    // Удаление карточки
    DeleteElement.addEventListener ('click', () => {
      let listItem = DeleteElement.closest('.element-list__item');
    listItem.remove();
    });
    // Лайк на карточку
    like.addEventListener('click', () => {
      like.classList.add('element-list__like_active');
    });
   
    // функция открытия картинки
    Cards.querySelector('.element-list__img').addEventListener('click', () => {
      ImageContainer.querySelector('.element-open-img__img').src = image.src;
      ImageContainer.querySelector('.element-open-img__img').alt = image.alt;
      ImageContainer.querySelector('.element-open-img__title').textContent = image.alt;
      OpenImage();
    });
    return Cards;
  };
  //Вызываем и создаём карточки из массива
  initialCards.forEach((item) => {
    let element = CreateNewElement(item.name, item.link);
    CreateElement(element, ElementList);
  });


// Открываем и закрываем попап Картинки

function popupImageClose(){
  ImageOpen.classList.remove('element-open-img__opened');
}

ImageOpen.addEventListener('click', popupImageClose);

function OpenImage (){
  ImageOpen.classList.add('element-open-img__opened');
};

// создание новой карточки
function addElementList(evt) {
  evt.preventDefault();
  ElementList.prepend(CreateNewElement(popupItemPlace.value, popupItemPicture.value));
  popupCardClose ();
  resetInput();
};

popupFormCard.addEventListener('submit', addElementList);
