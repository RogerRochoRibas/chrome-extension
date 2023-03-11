document.addEventListener("DOMContentLoaded", function () {
  var myButton = document.getElementById("myButton");
  myButton.addEventListener("click", function () {
    console.log("changeStatus start")
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
      chrome.tabs.executeScript(tab.id, {
        code: `
          let clickSpanAndDropdownItem = (spanText, dropdownText) => {
            const spans = Array.from(document.getElementsByTagName('span'));
    
            // Look for and click on <span> elements with text content
            const targetSpans = spans.filter(span => span.textContent.trim() === spanText);
            for (const span of targetSpans) {
              span.click();
              setTimeout(() => {
                const dropdownItem = Array.from(document.querySelectorAll('span.smb-DropdownItem-text')).find(span => span.textContent.trim() === dropdownText);
                if (dropdownItem) {
                  dropdownItem.click();
                }
              }, 1000);
            }
          }
    
          // Move "07. BLOCKED FUNCIONALES" to "02. PDT FUNCIONAL"
        setTimeout(() => {
          clickSpanAndDropdownItem('07. BLOCKED FUNCIONALES', '02. PDT FUNCIONAL');
        }, 1000);
          // Move "06. BLOCKED CANALES" to "03. PDT CANALES"
        setTimeout(() => {
          clickSpanAndDropdownItem('06. BLOCKED CANALES', '03. PDT CANALES');
        }, 1000);
        `
      });
    });

  });
});

