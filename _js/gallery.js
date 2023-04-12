"use strict";

/**
 * Selects a random full image at the start and displays it.
 */
function showRandomImageAtStart() {
  const figure = document.querySelector("figure");
  const thumbnails = document.querySelectorAll(".thumbnail");
  const links = document.querySelectorAll(".thumbnail a");
  const randomIndex = Math.floor(Math.random() * thumbnails.length);
  const randomThumbnail = thumbnails[randomIndex];
  function switchFullImage(imageUrl, altText) {}
  switchFullImage(links[randomIndex].href, randomThumbnail.alt);
  randomThumbnail.nextElementSibling.classList.add("bg-dark", "text-white");
}
//  Select all 6 links (<a>) in the thumbnail section. They contain the URLs to the full images.
//  Select a random entry out of these 6.
//  Implement switchFullImage() below.
//  Call switchFullImage() with the URL of the random image and the alt attribute of the thumbnail (it contains the description).
//  Set a background color (classes .bg-dark and .text-white) to the card-body of your random image (hint: it's the sibling element of your link).

/**
 * Prepare the links on the full images so that they execute the following tasks:
 * - Switch the full image to the one that has been clicked on.
 * - Set the highlight under the current thumbnail.
 * - Load the notes for the current image.
 */

function prepareLinks() {
  //  Select all the 6 links (<a>) in the thumbnail section.
  const links = document.querySelectorAll(".thumbnail a");

  //  Set an event listener for the click event on every <a> element.
  // (or advanced: think of a way to do it with one single handler)
  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      //  The callback of the listener should do the following things:
      // - Remove the .bg-dark and .text-white classes from the card where it's currently set.
      const currentCard = link.parentElement.parentElement;
      currentCard.classList.remove("bg-dark", "text-white");

      // - Add both classes again to the card where the click happened (hint: "this" contains the very <a> element, where the click happened).
      this.parentElement.parentElement.classList.add("bg-dark", "text-white");

      // - Call switchFullImage() with the URL clicked link and the alt attribute of the thumbnail.
      switchFullImage(this.href, this.parentElement.querySelector("img").alt);

      // - Implement and then call loadNotes() with the key for the current image (hint: the full image's URL makes an easy and unique key).
      const imageKey = this.href;
      loadNotes(imageKey);

      // - Prevent the default action for the link (we don't want to follow it).
      event.preventDefault();
    });
  });
}

/**
 * Stores or deletes the updated notes of an image after they have been changed.
 */
function storeNotes() {
  //  Select the notes field and add a blur listener.
  const notesField = document.querySelector("#notes");
  notesField.addEventListener("blur", function () {
    //  When the notes field loses focus, store the notes for the current image in the local storage.
    const imageKey = document.querySelector(".full-img").src; // Assuming .full-img is the class for the full image element
    const notes = notesField.value;
    if (notes) {
      localStorage.setItem(imageKey, notes);
    } else {
      //  If the notes field is empty, remove the local storage entry.
      localStorage.removeItem(imageKey);
    }
  });
}

/**
 * Switches the full image in the <figure> element to the one specified in the parameter. Also updates the image's alt
 * attribute and the figure's caption.
 * @param {string} imageUrl The URL to the new image (the image's src attribute value).
 * @param {string} imageDescription The image's description (used for the alt attribute and the figure's caption).
 */
function switchFullImage(imageUrl, imageDescription) {
  //  Get the <img> element for the full image. Select it by its class or tag name.
  const fullImageElement = document.querySelector(".full-img"); // Assuming .full-img is the class for the full image element

  // Set its src and alt attributes with the values from the parameters (imageUrl, imageDescription).
  fullImageElement.src = imageUrl;
  fullImageElement.alt = imageDescription;

  //  Select the <figcaption> element.
  const figCaptionElement = document.querySelector("figcaption"); // Assuming <figcaption> is the tag name for the caption element

  //  Set the description (the one you used for the alt attribute) as its text content.
  figCaptionElement.textContent = imageDescription;
}

/**
 * Loads the notes from local storage for a given key and sets the contents in the notes field with the ID notes.
 * @param {string} key The key in local storage where the entry is found.
 */
function loadNotes(key) {
  //  Select the notes field.
  const notesField = document.getElementById("notes"); // Assuming 'notes' is the ID of the notes field element

  //  Check the local storage at the provided key.
  const notes = localStorage.getItem(key);

  // If there's an entry, set the notes field's HTML content to the local storage's content.
  if (notes) {
    notesField.innerHTML = notes;
  }
  // If there's no entry, set the default text "Enter your notes here!".
  else {
    notesField.innerHTML = "Enter your notes here!";
  }
}

/**
 * Returns a random integer value between min (included) and max (excluded).
 * @param {number} min The minimum value (included).
 * @param {number} max The maximum value (excluded).
 * @returns {number} A random integer value between min (included) and max (excluded).
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Gets the whole thing started.
 */
showRandomImageAtStart();
prepareLinks();
storeNotes();
