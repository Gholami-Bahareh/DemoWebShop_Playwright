
    
function randomEmail() {
    const chr = "abcdefghijklmnopqrstuvwxyz123456789";
    let username = "";

    for (let i = 0; i < 6; i++) {
        const index = Math.floor(Math.random() * chr.length);
        username += chr[index];
    }

    return username + "@gmail.com";
}

function randomPassword() {
    const chr = "abcdefghijklmnopqrstuvwxyz123456789";
    let password = "";

    for (let i = 0; i < 8; i++) {
        const index = Math.floor(Math.random() * chr.length);
        password += chr[index];
    }
    return password;

}

function toTitleCase(text) {
  return text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
module.exports = { randomEmail , randomPassword , toTitleCase };



