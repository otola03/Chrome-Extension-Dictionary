// Global variable to track the current tooltip
let currentTooltip = null;

// Function to remove the tooltip
const removeTooltip = () => {
  if (currentTooltip) {
    currentTooltip.remove();
    currentTooltip = null;
  }
};

// Function to analyze text by communicating with the background script
async function analyzeText(text, context) {
  try {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(
        { action: 'analyzeText', text, context },
        (response) => {
          if (chrome.runtime.lastError) {
            console.error('Error sending message:', chrome.runtime.lastError);
            reject(chrome.runtime.lastError.message);
            return;
          }

          if (response.success) {
            resolve(response.result);
          } else {
            reject(response.error || 'Unknown error');
          }
        }
      );
    });
  } catch (error) {
    console.error('Error analyzing text:', error);
    return 'Error analyzing text';
  }
}

async function getDefinition(text, context) {
  try {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(
        { action: 'getDefinition', text, context },
        (response) => {
          if (chrome.runtime.lastError) {
            console.error('Error sending message:', chrome.runtime.lastError);
            reject(chrome.runtime.lastError.message);
            return;
          }

          if (response.success) {
            resolve(response.result);
          } else {
            reject(response.error || 'Unknown error');
          }
        }
      );
    });
  } catch (error) {
    console.error('Error getting definition of the text:', error);
    return 'Error getting definition of the text';
  }
}

// Get surrounding text to provide context
function getSurroundingText(range) {
  // Get the container element
  const container = range.commonAncestorContainer;
  const containerElement =
    container.nodeType === 3 ? container.parentElement : container;

  const containerText = containerElement.textContent || ''; // if undefined, use empty string
  console.log('CONTEXT_TEXT:', containerText);
  return containerText;
}

// Add event listener for mouse selection
document.addEventListener('mouseup', async () => {
  const selection = window.getSelection();
  const text = selection.toString().trim();

  // remove existing tooltip
  if (currentTooltip) {
    removeTooltip();
  }

  if (text && !document.getElementById('tooltip-popup')) {
    const tooltip = document.createElement('div');
    tooltip.id = 'tooltip-popup';
    tooltip.classList.add('tooltip');

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    // Position is handled by CSS now
    tooltip.style.top = `${rect.bottom + window.scrollY + 10}px`;
    tooltip.style.left = `${rect.left + window.scrollX}px`;

    tooltip.innerHTML = '<div class="tooltip-content">Analyzing...</div>';
    document.body.appendChild(tooltip);
    currentTooltip = tooltip;

    // Get context and analyze
    const context = getSurroundingText(range);
    try {
      const analysis = await analyzeText(text, context);
      const definition = await getDefinition(text, context);

      if (currentTooltip) {
        currentTooltip.innerHTML = `
        <div class="tooltip-content">
          <span id="tooltip--text">${text}</span>
          <span id="toolltip-definition">${definition}</span>
          <span id="tooltip-analysis">${analysis}</span>
        </div>
        `;

        // Add close button
        const closeBtn = document.createElement('span');
        closeBtn.classList.add('close-btn');
        closeBtn.innerHTML = '×';
        closeBtn.onclick = removeTooltip;
        currentTooltip.appendChild(closeBtn);
      }
    } catch (error) {
      if (currentTooltip) {
        currentTooltip.innerHTML = `<div class="tooltip-content">Error: ${error}</div>`;
      }
    }
  }
});

// Close tooltip when clicking outside
document.addEventListener('mousedown', (e) => {
  if (currentTooltip && !currentTooltip.contains(e.target)) {
    removeTooltip();
  }
});
