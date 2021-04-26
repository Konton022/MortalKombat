const createElem = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}
const createPlayer = (playerObj) => {
    const $player = createElem('div', 'player' + playerObj.player);
    const $progressbar = createElem('div', 'progressbar');
    const $character = createElem('div', 'character');
    const $life = createElem('div', 'life');
    const $name = createElem('div', 'name');
    const $img = createElem('img');

    $life.style.width = playerObj.hp + '%';
    $img.src = playerObj.img;
    $name.innerText = playerObj.name;

    $player.appendChild($progressbar);
    $player.appendChild($character);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img);

    return $player;
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

export { createElem, createPlayer, getRandom, getTime };