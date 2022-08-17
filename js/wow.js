function typewriter(element, text, delay = 100) {
  for (let i = 0; i < text.length; i++) {
    setTimeout(() => {
      element.innerHTML += text[i];
    }, delay * i);
  }
}

const el = document.getElementById("typewriter");
typewriter(el, "Lorem ipsum dolor sit amet", "test");