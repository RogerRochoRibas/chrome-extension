document.addEventListener("DOMContentLoaded", function () {
    var myButton = document.getElementById("myButton");
    myButton.addEventListener("click", function () {
        console.log("sprintNumber start")
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const tab = tabs[0];
            chrome.tabs.executeScript(tab.id, {
                code: `
                let findSprintNumber = () => {
                    const sprintRegex = /Sprint\\s*(\\d{3})/i;
                    const sprintSpan = Array.from(document.querySelectorAll('span')).find(span => span.innerText.includes('Sprint '));
                    if (sprintSpan) {
                        const sprintText = sprintSpan.textContent.trim();
                        const match = sprintText.match(sprintRegex);
                        if (match) {
                            const sprintNumber = match[1];
                            console.log("Sprint number:", sprintNumber);
                            return sprintNumber;
                        }
                    }
                    return null;
                  }
                  
                  findSprintNumber();
                  
          `
            });
        });
    });
});
