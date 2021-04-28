getPlayers = async () => {
    const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());
    return body;
}

