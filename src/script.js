/**
 * @file script.js
 * Main JavaScript file for demonstrating various touch events and interactions.
 * This includes multi-touch dot visualization, pinch-to-zoom, and a draggable element.
 */

/**
 * Array of colors for differentiating multiple touch points.
 * @type {string[]}
 */
const touchColors = ['red', 'blue', 'green', 'orange', 'purple', 'yellow'];
/**
 * Index to cycle through the {@link touchColors} array.
 * @type {number}
 */
let colorIndex = 0;

/**
 * Stores active touch points and their assigned colors.
 * Keys are touch identifiers, values are color strings.
 * @type {Object.<number, string>}
 */
const activeTouches = {};

/**
 * Handles the 'touchstart' event on the document.
 * Creates a uniquely colored dot for each new touch point.
 * @param {TouchEvent} e - The touch event object.
 */
document.addEventListener(
  'touchstart',
  (e) => {
    // Note: e.preventDefault() is commented out here to allow default actions like text selection
    // on other parts of the page. It's used specifically for features like the draggable element.
    [...e.changedTouches].forEach((touch) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      dot.style.left = `${touch.pageX}px`;
      dot.style.top = `${touch.pageY}px`;
      dot.id = touch.identifier;

      // Assign a unique color to the new touch
      if (!activeTouches[touch.identifier]) {
        activeTouches[touch.identifier] =
          touchColors[colorIndex % touchColors.length];
        colorIndex++;
      }
      dot.style.backgroundColor = activeTouches[touch.identifier];

      document.body.appendChild(dot);
    });
  },
  false
);

/**
 * Handles the 'touchmove' event on the document.
 * Updates the position of the colored dots corresponding to active touches.
 * @param {TouchEvent} e - The touch event object.
 */
document.addEventListener(
  'touchmove',
  (e) => {
    [...e.changedTouches].forEach((touch) => {
      const dot = document.getElementById(touch.identifier);
      if (dot) {
        // Ensure dot exists, as touchmove can sometimes fire unexpectedly
        dot.style.left = `${touch.pageX}px`;
        dot.style.top = `${touch.pageY}px`;
      }
    });
  },
  false
);

/**
 * Handles the 'touchend' event on the document.
 * Removes the colored dots when touches are lifted from the screen.
 * Resets colorIndex if all touches are removed.
 * @param {TouchEvent} e - The touch event object.
 */
document.addEventListener(
  'touchend',
  (e) => {
    [...e.changedTouches].forEach((touch) => {
      const dot = document.getElementById(touch.identifier);
      if (dot) {
        dot.remove();
      }
      delete activeTouches[touch.identifier]; // Clean up active touch color
      if (Object.keys(activeTouches).length === 0) {
        colorIndex = 0; // Reset color index if no touches are active
      }
    });
  },
  false
);

/**
 * Handles the 'touchcancel' event on the document.
 * Removes colored dots if a touch is interrupted (e.g., by a system gesture).
 * Resets colorIndex if all touches are removed.
 * @param {TouchEvent} e - The touch event object.
 */
document.addEventListener(
  'touchcancel',
  (e) => {
    [...e.changedTouches].forEach((touch) => {
      const dot = document.getElementById(touch.identifier);
      if (dot) {
        dot.remove();
      }
      delete activeTouches[touch.identifier]; // Clean up active touch color
      if (Object.keys(activeTouches).length === 0) {
        colorIndex = 0; // Reset color index if no touches are active
      }
    });
  },
  false
);

// --- Pinch-to-Zoom Logic ---
/**
 * The HTML element that will have its font size changed by pinch-to-zoom.
 * @type {HTMLElement|null}
 */
const zoomElement = document.getElementById('zoomableText');
/**
 * The HTML container element for the pinch-to-zoom feature. Events are attached here.
 * @type {HTMLElement|null}
 */
const zoomContainer = document.getElementById('zoomTextContainer');
/**
 * Stores the initial distance between two touch points for pinch-to-zoom.
 * @type {number|null}
 */
let initialDistance = null;
/**
 * Stores the initial font size of the {@link zoomElement} before zooming.
 * @type {number}
 */
let initialFontSize = 16; // Default, will be updated from computed style

if (zoomContainer) {
  /**
   * Handles 'touchstart' on the zoom container.
   * If two fingers are used, captures the initial distance and font size.
   * @param {TouchEvent} e - The touch event.
   */
  zoomContainer.addEventListener(
    'touchstart',
    (e) => {
      if (e.touches.length === 2) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        initialDistance = Math.hypot(
          touch1.clientX - touch2.clientX,
          touch1.clientY - touch2.clientY
        );
        if (zoomElement) {
          initialFontSize = parseFloat(
            window.getComputedStyle(zoomElement).fontSize
          );
        }
        // e.preventDefault(); // Optional: could prevent page scroll/zoom if needed immediately
      }
    },
    { passive: false } // passive: false to allow preventDefault if it were used
  );

  /**
   * Handles 'touchmove' on the zoom container.
   * If two fingers are moving and an initial distance is set, calculates the scale
   * and updates the font size of the {@link zoomElement}.
   * Calls preventDefault to stop page zoom/scroll.
   * @param {TouchEvent} e - The touch event.
   */
  zoomContainer.addEventListener(
    'touchmove',
    (e) => {
      if (e.touches.length === 2 && initialDistance !== null) {
        e.preventDefault(); // Prevent default page zoom/scroll during custom pinch
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const currentDistance = Math.hypot(
          touch1.clientX - touch2.clientX,
          touch1.clientY - touch2.clientY
        );
        const scaleFactor = currentDistance / initialDistance;
        if (zoomElement) {
          zoomElement.style.fontSize = `${initialFontSize * scaleFactor}px`;
        }
      }
    },
    { passive: false } // passive: false is crucial for preventDefault to work
  );

  /**
   * Handles 'touchend' on the zoom container.
   * Resets {@link initialDistance} if fewer than two fingers remain,
   * preparing for the next pinch gesture.
   * @param {TouchEvent} e - The touch event.
   */
  zoomContainer.addEventListener('touchend', (e) => {
    if (e.touches.length < 2) {
      initialDistance = null;
    }
  });

  /**
   * Handles 'touchcancel' on the zoom container.
   * Resets {@link initialDistance} if the touch is interrupted.
   */
  zoomContainer.addEventListener('touchcancel', () => {
    initialDistance = null;
  });
}

// --- Draggable Element Logic ---
/**
 * The HTML element that can be dragged.
 * @type {HTMLElement|null}
 */
const draggableElement = document.getElementById('draggableElement');
/**
 * Stores the horizontal offset of the touch point within the {@link draggableElement}.
 * @type {number}
 */
let offsetX = 0;
/**
 * Stores the vertical offset of the touch point within the {@link draggableElement}.
 * @type {number}
 */
let offsetY = 0;
/**
 * Flag indicating if the {@link draggableElement} is currently being dragged.
 * @type {boolean}
 */
let activeDraggable = false;

if (draggableElement) {
  /**
   * Handles 'touchstart' on the draggable element.
   * Initializes dragging state, records touch offset, and adds a 'dragging' class.
   * @param {TouchEvent} e - The touch event.
   */
  draggableElement.addEventListener(
    'touchstart',
    (e) => {
      activeDraggable = true;
      const touch = e.touches[0]; // Use the first touch for dragging
      offsetX = touch.clientX - draggableElement.getBoundingClientRect().left;
      offsetY = touch.clientY - draggableElement.getBoundingClientRect().top;
      draggableElement.classList.add('dragging');
      // Consider e.preventDefault() here if needed to prevent text selection on the draggable itself
    },
    { passive: false } // passive: false if preventDefault might be used
  );

  /**
   * Handles 'touchmove' on the document to allow dragging anywhere on screen.
   * If dragging is active, prevents default scroll/zoom and updates element position.
   * Constrains movement within the viewport.
   * @param {TouchEvent} e - The touch event.
   */
  document.addEventListener(
    'touchmove',
    (e) => {
      if (activeDraggable) {
        e.preventDefault(); // Prevent page scrolling while dragging
        const touch = e.touches[0];
        let newX = touch.clientX - offsetX;
        let newY = touch.clientY - offsetY;

        // Constrain to viewport
        newX = Math.max(
          0,
          Math.min(newX, window.innerWidth - draggableElement.offsetWidth)
        );
        newY = Math.max(
          0,
          Math.min(newY, window.innerHeight - draggableElement.offsetHeight)
        );

        draggableElement.style.left = `${newX}px`;
        draggableElement.style.top = `${newY}px`;
      }
    },
    { passive: false } // Crucial for preventDefault to work reliably
  );

  /**
   * Ends the dragging process.
   * Resets {@link activeDraggable} and removes the 'dragging' class.
   */
  const endDrag = () => {
    if (activeDraggable) {
      activeDraggable = false;
      draggableElement.classList.remove('dragging');
    }
  };

  /**
   * Handles 'touchend' on the document to end dragging.
   */
  document.addEventListener('touchend', endDrag);
  /**
   * Handles 'touchcancel' on the document to end dragging if interrupted.
   */
  document.addEventListener('touchcancel', endDrag);
}
