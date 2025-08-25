chrome.commands.onCommand.addListener((command) => {
  let kibanaUrl = null;
  // Command name reflected in manifest.json - can be changed appropriately
  if (command === "suricata-search") {
    // Notice: query -> specifier -> identifier can all be changed
    kibanaUrl = "http://localhost:5601/app/discover#/?_a=(query:(language:kuery,query:'event.module: \"suricata\"'))";
  } else if (command === "system-search") {
    kibanaUrl = "http://localhost:5601/app/discover#/?_a=(query:(language:kuery,query:'event.original: \"system\"'))";
  } else if (command === "sysmon-search") {
    kibanaUrl = "http://localhost:5601/app/discover#/?_a=(query:(language:kuery,query:'event.original: \"sysmon\"'))";
  }

  if (kibanaUrl) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.update(tabs[0].id, { url: kibanaUrl });
      }
    });
  }
});
