const createElem = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}

const getRandom = (numb) => Math.ceil(Math.random() * numb);

const getTime = () => {

    const date = new Date()

    const getTen = (time) => {
        let tempStr = '';
        if (time < 10) {
            tempStr = `0${time}`;
            return tempStr
        }
        else {
            tempStr += time;
            return tempStr
        }

    }
    const curHours = getTen(date.getHours());
    const curMin = getTen(date.getMinutes());
    const curSec = getTen(date.getSeconds());
    return `${curHours}:${curMin}:${curSec}`;

}

const getMyPlayer = async () => {
    const body = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());
    // return body;
    const playerOne = body[getRandom(body.length - 1)]
    return playerOne
}

const getEnemyPlayer = async () => {
    const body = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json());
    return body;
}

// const getAttack = async (argHit, argDefence) => {

//     const body = await fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
//         method: 'POST',
//         body: JSON.stringify({
//             hit: argHit,
//             defence: argDefence,
//         })

//     })
//         // .then(res => {
//         //     console.log('### res:  ', res);
//         //     return res.json()
//         // })
//         .then(data => data.json())
//     console.log('@@@ getResults:',);
//     return body;
// }
// const p1 = await getMyPlayer();
// const playerOne = p1[getRandom(p1.length - 1)]
// console.log('### my player is', playerOne);

export { createElem, getRandom, getTime, getMyPlayer, getEnemyPlayer, };