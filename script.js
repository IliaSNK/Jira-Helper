chrome.storage.onChanged.addListener((changes, namespace) => {
    switch (changes?.run.newValue) {
        case 'SP sum':
            chrome.storage.sync.set({ result: SPsum() })
            break;
        case 'GetKeys':
            chrome.storage.sync.set({ result: `key in (${Array.from(document.getElementsByClassName('issuekey')).map(el => el.children[0].innerHTML).join(', ')} )` })
            break;
        default:
            break;
    }
    chrome.storage.sync.set({ run: '' })
});


function SPsum() {
    return Array.from(document.getElementsByClassName('customfield_10027')).map(el => el.innerHTML === '' ? 0 : parseInt(el.innerHTML, 10)).reduce((acc, val) => acc + val);
}

function addSPsum() {
    const th = document.querySelector('.headerrow-customfield_10027')
    console.log(th);
    if (th) th.getElementsByTagName('span')[0].innerHTML = 'SP (' + SPsum() + ')';
}
function addEpicFilter() {
    const type = document.getElementById('type-val')
    console.log(type);
    if (type && type.innerHTML.includes('Epic')) {
        const bc = document.querySelector('.aui-nav-breadcrumbs');
        const li = document.createElement('li');
        const a = document.createElement('a')
        // const key = bc.innerHTML.match(/CVFR-\d*/g)[0]
        const key = bc.innerHTML.match(/data-issue-key="\w*-\d*/g)[0].replace('data-issue-key="', '')
        a.setAttribute('href', `https://jira.coms.ru/issues/?jql=%22Epic%20Link%22%3D${key}`)
        a.innerHTML = 'EpicLink = ' + key;
        li.appendChild(a)
        bc.appendChild(li)

        const hasSubTask = Array.from(document.querySelectorAll('.toggle-title')).filter(el => /Подзадачи/g.test(el.innerHTML))
        if (hasSubTask.length) {
            const li2 = document.createElement('li');
            const a2 = document.createElement('a')
            a2.setAttribute('href', `https://jira.coms.ru/issues/?jql=parent%3D${key}`)
            a2.innerHTML = 'Parent = ' + key;
            li2.appendChild(a2)
            bc.appendChild(li2)
        }
    }
    if (type && type.innerHTML.includes('История')) {
        const bc = document.querySelector('.aui-nav-breadcrumbs');
        const li = document.createElement('li');
        const a = document.createElement('a')
        // const key = bc.innerHTML.match(/CVFR-\d*/g)[0]
        const key = bc.innerHTML.match(/data-issue-key="\w*-\d*/g)[0].replace('data-issue-key="', '')
        a.setAttribute('href', `https://jira.coms.ru/issues/?jql=parent%3D${key}`)
        a.innerHTML = 'Parent = ' + key;
        li.appendChild(a)
        bc.appendChild(li)
    }
}

addSPsum();
addEpicFilter();

document.addEventListener('click', addSPsum)