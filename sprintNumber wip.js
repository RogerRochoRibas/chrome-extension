document.addEventListener("DOMContentLoaded", function () {
  var myButton = document.getElementById("myButton");
  myButton.addEventListener("click", function () {
    console.log("sprintNumber start");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
      chrome.tabs.executeScript(tab.id, {
        code: `
            let findSprintNumber = async () => {
              const sprintSpans = Array.from(document.querySelectorAll('span'));
              const sprintSpan = sprintSpans.find(span => span.innerText.includes('Sprint 1'));
              if (sprintSpan) {
                const sprintText = sprintSpan.textContent.trim().substr(0, 10);
                const sprintNumber = sprintText.substr(-3);
                const newSprintNumber = parseInt(sprintText.substr(-3), 10) + 1;
                const newSprintText = "Sprint " + newSprintNumber;
                console.log("newSprintText:", newSprintText);
  
                const cells = Array.from(document.querySelectorAll('div.smb-TableCell-renderContent'));
for (const cell of cells) {
  if (cell.textContent.trim().substr(0, 10) === sprintText) {
    console.log("filtered cell: ", cell);
    await new Promise(resolve => {
      cell.click();
      setTimeout(resolve, 2000); // Add delay of 2 seconds
    });
    let newSprintSpans = [];
    for (const span of Array.from(document.querySelectorAll('span'))) {
      if (span.textContent.trim().substr(0, 10) === newSprintText) {
        newSprintSpans.push(span);
      }
    }
    console.log("newSprintSpans", newSprintSpans);
    if (newSprintSpans.length > 0) {
      newSprintSpans[0].click();
      await new Promise(resolve => setTimeout(resolve, 2000)); // Add delay of 2 seconds
    }
  }
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