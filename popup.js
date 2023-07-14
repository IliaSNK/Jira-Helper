function execute(e) {
  const commandName = e.target.closest('.script').querySelector('.title').innerHTML;
  console.log(commandName);
  chrome.storage.sync.set({ run: commandName })
}

const runBtns = document.querySelectorAll('.exec')
if (runBtns.length) {
  runBtns.forEach(btn => {
    if (btn) btn.addEventListener('click', execute);
  });
}


chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes?.result) {
    const result = document.getElementById('result');
    if (result) {
      result.innerHTML = changes?.result?.newValue;
      console.log(changes?.result.newValue);
    }
  }
});

chrome.storage.sync.get(['result'], (result) => {
  document.getElementById('result').innerHTML = result.result;
});