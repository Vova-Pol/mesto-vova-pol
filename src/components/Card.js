import { userData } from "../pages/index.js";

export class Card {
  constructor(
    { name, link, likes, _id },
    templateSelector,
    { handleCardClick }
  ) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._id = _id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__item")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getElement();
    this._elementImage = this._element.querySelector(".elements__image");
    this._buttonLike = this._element.querySelector(".elements__like-button");

    this._likesCounter = this._element.querySelector(".elements__like-counter");
    this._likesCounter.textContent = this._likes.length;

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._element.querySelector(".elements__title").textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._buttonLike.addEventListener("click", () => {
      this._handleLikeButton();
    });

    this._element
      .querySelector(".elements__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteButton();
      });

    this._elementImage.addEventListener("click", () => {
      this._handleCardClick();
    });
  }

  _handleLikeButton() {
    if (!this._buttonLike.classList.contains("elements__like-button_active")) {
      this._likesCounter.textContent = this._likes.length + 1;
    } else {
      this._likesCounter.textContent = this._likes.length;
    }

    this._buttonLike.classList.toggle("elements__like-button_active");
  }

  _handleDeleteButton() {
    const popupDeleteCard = document.querySelector("#popup-delete-card");
    popupDeleteCard.classList.add("popup_opened");

    // this._element.remove();
    // this._element = null;
  }
}
