const team = document.getElementById("team")
const credit = document.getElementById("credit")

const key = window.location.pathname.substr(15, 21)
if (!localStorage.getItem(key)) localStorage.setItem(key, ',')
let teamMember = [...localStorage.getItem(key).split(',')]
displayTeam()

let ckey = `${key}c`
if (!localStorage.getItem(ckey)) localStorage.setItem(ckey, parseFloat(credit.innerText))
let cr = localStorage.getItem(ckey)
credit.innerText = cr

function getPlayer(e) {

    let c = $(e).attr('data-creditValue')

    if (e.checked) {

        if (parseFloat(credit.innerText) >= c) {
            cr = parseFloat(credit.innerText) - c
            credit.innerText = cr
            localStorage.setItem(ckey, cr)

            teamMember.push(e.value)
            teamMember = [...new Set(teamMember)]
            localStorage.setItem(key, [...teamMember])
        }
        displayTeam()

    } else {

        const remove = teamMember.filter(p => p === e.value)
        if (remove.length > 0) {
            cr = parseFloat(credit.innerText) + parseFloat(c)
            console.log(cr);
            credit.innerText = cr
            localStorage.setItem(ckey, cr)
        }

        teamMember = teamMember.filter(p => p !== e.value)
        localStorage.setItem(key, [...teamMember])
        displayTeam();
    }
}

function displayTeam() {
    team.innerHTML = `
        ${teamMember.map((p, index) => `<p>${p} ${index === 1 ? '<b>Captain(2x)</b>' : ''} ${index === 2 ? '<b>Vice-Captain(1.5x)</b>' : ''} </p>`).join('')}
    `
}
