import { Wheel } from '../../../dist/spin-wheel-esm.js';
import { loadFonts } from '../../../scripts/util.js';
import { props } from './props.js';

window.onload = async () => {
  await loadFonts(props.map(i => i.itemLabelFont));
  init();
};

function init() {

  const container = document.querySelector('.wheel-wrapper');
  // const dropdownWinningItem = document.querySelector('select.winning-item');
  // const dropdownEasingFunction = document.querySelector('select.easing-function');
  // const dropdownRevolutions = document.querySelector('select.revolutions');

  const btnSpin = document.querySelector('.gui-wrapper .btn-spin');
  const btnStop = document.querySelector('.gui-wrapper .btn-stop');

  window.wheel = new Wheel(document.querySelector('.wheel-wrapper'));

  wheel.init({
    ...props[0],
    rotation: wheel.rotation, // Preserve value.
  });

  window.addEventListener('click', (e) => {

    // Listen for click event on spin button:
    if (e.target === btnSpin) {
      const winningItemIndex = fetchWinningItemIndexFromApi();
      const duration = 2600;
      if (winningItemIndex === "") {
        wheel.spin(400)
      } else {
        wheel.spinToItem(parseInt(winningItemIndex), duration, true, 2, 1);
      }
    }

    // Listen for click event on stop button:
    if (e.target === btnStop) {
      wheel.stop();
    }

  });

  window.addEventListener('keyup', (e) => {

    if (e.target && e.target.matches('#pointerAngle')) {
      wheel.pointerAngle = parseInt(e.target.value) || 0;
    }

  });

  function fetchWinningItemIndexFromApi() {
    // Simulate a call to the back-end
    const indexToWin = "2";
    return indexToWin;
  }

}