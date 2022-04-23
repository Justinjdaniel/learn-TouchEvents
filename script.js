//* touch events in javascript

/**
 * show a red dot where the user touched
 */
document.addEventListener(
  'touchstart',
  (e) => {
    // e.preventDefault(); // prevent scrolling
    [...e.changedTouches].forEach((touch) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      dot.style.left = `${touch.pageX}px`;
      dot.style.top = `${touch.pageY}px`;
      dot.id = touch.identifier;
      document.body.appendChild(dot);
    });
  },
  false
);

/** 
 * move the red dot to the new position
*/
document.addEventListener(
  'touchmove',
  (e) => {
    [...e.changedTouches].forEach((touch) => {
      const dot = document.getElementById(touch.identifier);
      dot.style.left = `${touch.pageX}px`;
      dot.style.top = `${touch.pageY}px`;
    });
  },
  false
);

/**
 * removes the red dot when the user touch ends
 */
document.addEventListener(
  'touchend',
  (e) => {
    [...e.changedTouches].forEach((touch) => {
      const dot = document.getElementById(touch.identifier);
      dot.remove(dot);
    });
  },
  false
);

/** 
 * removes the red dot when the user touch leaves the screen
 */
document.addEventListener(
  'touchcancel',
  (e) => {
    [...e.changedTouches].forEach((touch) => {
      const dot = document.getElementById(touch.identifier);
      dot.remove();
    });
  },
  false
);
