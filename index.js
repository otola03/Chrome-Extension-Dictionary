'use strict';

let currentTooltip = null;

const removeTooltip = () => {
  currentTooltip.remove();
  currentTooltip = null;
};

document.addEventListener('mouseup', (event) => {
  const selection = window.getSelection();
  const text = selection.toString().trim();
  // remove existing tooltip
  if (currentTooltip) {
    removeTooltip();
  }

  if (text && !document.getElementById('tooltip-popup')) {
    const tooltip = document.createElement('div');
    tooltip.textContent = text;
    tooltip.id = 'tooltip-popup';
    // tooltip position
    const range = selection.getRangeAt(0).getBoundingClientRect();
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const scrollX = window.scrollX || document.documentElement.scrollLeft;

    // First append to get tooltip dimensions
    document.body.appendChild(tooltip);

    // Now we can use tooltip.offsetWidth for centering
    tooltip.style.top = `${range.bottom + scrollY + 5}px`; // 5px gap below text
    tooltip.style.left = `${
      range.left + scrollX + range.width / 2 - tooltip.offsetWidth / 2
    }px`;
    // update currentTooltip
    currentTooltip = tooltip;
  }
});

document.addEventListener('click', (event) => {
  // if tooltip exists and clicked on anything other than the tooltip.
  if (currentTooltip && !currentTooltip.contains(event.target)) {
    removeTooltip();
  }
});
