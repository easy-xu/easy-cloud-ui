import localStorage from "localStorage";


export function getUserInfo() {
    let userInfoStr = localStorage.getItem("user-info");
    if (userInfoStr) {
        let userInfo = JSON.parse(userInfoStr)
    }


}