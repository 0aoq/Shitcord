var auth = firebase.auth()

if (document.getElementById("page").innerHTML == "auth") {
    document.getElementById("signupform").addEventListener('submit', e => {
        e.preventDefault()

        const email = document.getElementById("signupform").email.value
        const password = document.getElementById("signupform").password.value
        const username = document.getElementById("signupform").username.value

        auth.createUserWithEmailAndPassword(email, password).then(function(result) {
                return result.user.updateProfile({
                    displayName: username
                })
            })
            .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/weak-password') {
                    alert('The password is too weak.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            });
    })

    document.getElementById("loginform").addEventListener('submit', e => {
        e.preventDefault()

        const email = document.getElementById("loginform").email.value
        const password = document.getElementById("loginform").password.value

        auth.signInWithEmailAndPassword(email, password)
    })
}

auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("User is signed in.")

        if (document.getElementById("page").innerHTML == "auth") {
            setTimeout(() => {
                window.location = "servers.html"
            }, 100);
        } else if (document.getElementById("page").innerHTML == "servers") {
            document.querySelector("#user_info h4").innerText = user.displayName
            document.querySelector("#user_info a").addEventListener('click', () => {
                auth.signOut()
            })
        }
    } else {
        console.log("User is not signed in.")

        if (document.getElementById("auth_required").innerHTML == "true") {
            window.location = "auth.html"
        }
    }
});