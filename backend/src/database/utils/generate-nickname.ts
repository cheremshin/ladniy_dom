const baseName = 'Пользователь-';
const alphabet = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890');

export const generateNickname = (length: number = 10) => {
    let nickname = baseName;

    for (let i = 0; i < length; ++i) {
        nickname += alphabet[Math.floor(Math.random() * alphabet.length)];
    }

    return nickname;
};
