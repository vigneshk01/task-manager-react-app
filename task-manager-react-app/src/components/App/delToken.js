

export default function delToken() {

    const delToken = () => {
        if(localStorage) {
            localStorage.clear()
        } else {
            alert("Sorry, no local storage.");
        }
    }

    return {
        delToken
    }
}