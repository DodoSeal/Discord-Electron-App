const button = document.getElementById(`button`);
const input = document.getElementById(`input`);
var msg;

button.addEventListener(`click`, () =>{
    switch(button.value){
        case "Login":
            const token = input.value;
            if (token !== "") {
                window.electronAPI.setToken(token);
                button.value = "Next";
                input.placeholder = "Message";
                input.type = "text";
                input.value = "";
            };
            break;
        case "Next":
            msg = input.value;
            button.value = "Send Msg";
            input.placeholder = "Channel Id";
            input.value = "";
            break;
        case "Send Msg":
            window.electronAPI.sendMsg(msg, input.value);
            button.value = "Next";
                input.placeholder = "Message";
                input.value = "";
    };
});