document.addEventListener("DOMContentLoaded", function () {
  var myButton = document.getElementById("myButton");
  myButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const tab = tabs[0];
      chrome.tabs.executeScript(tab.id, {
        code: `
          const spans = Array.from(document.getElementsByTagName('span'));
          const targetSpans = spans.filter(span => span.textContent.trim() === '06. BLOCKED CANALES');
          for (const targetSpan of targetSpans) {
            targetSpan.click();
            setTimeout(() => {
              const dropdownItem = Array.from(document.querySelectorAll('span.smb-DropdownItem-text')).find(span => span.textContent.trim() === '03. PDT CANALES');
              if (dropdownItem) {
                dropdownItem.click();
              }
            }, 250);
          }
        `
      });
    });
  });
});