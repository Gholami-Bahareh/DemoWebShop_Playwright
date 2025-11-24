function randomEmail() {
    const chr = "abcdefghijklmnopqrstuvwxyz123456789";
    let username = "";

    for (let i = 0; i < 6; i++) {
        const index = Math.floor(Math.random() * chr.length);
        username += chr[index];
    }

    return username + "@gmail.com";
}