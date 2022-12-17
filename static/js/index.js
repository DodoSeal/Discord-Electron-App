const bot_login_btn = document.getElementById(`bot-login`);

bot_login_btn.addEventListener(`click`, () =>{
    const bot_token = document.getElementById(`bot-token-input`).value;
    if (bot_token !== "") {
        window.electron.bot_login(bot_token)
    };
});