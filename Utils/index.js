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

export { createElem, getRandom, getTime };