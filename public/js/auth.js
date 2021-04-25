const fsignIn = async () => {
    try {
        const provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('email, user_birthday');
        firebase.auth().useDeviceLanguage();
        const result = await firebase.auth().signInWithPopup(provider)
        const token = result.credential.accessToken;
        const user = result.user;
        console.log("token", token);
        console.log("user", user);
        window.location = '/fantasy-match'
    } catch (err) {
        console.log(err.message);
        window.location = '/auth/login'
    }
}

const fsignOut = () => {
    firebase.auth().signOut()
        .then(() => {
            console.log("U logged out");
            window.location = '/auth/login'
        })
        .catch(() => {
            console.log("Something went wrong!!");
            window.location = '/auth/login'
        })
}

const psignIn = async () => {
    try {
        const recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha-container');
        const number = prompt("Enter your number", "");
        if (!number) return;
        const res = await firebase.auth().signInWithPhoneNumber(number, recaptcha);
        const otp = prompt("Enter OTP", "");
        if (!otp) return;
        const result = await res.confirm(otp)
        console.log(result);
        window.location = '/fantasy-match'
    } catch (err) {
        console.log(err);
        window.location = '/auth/login'
    }
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        const cu = firebase.auth().currentUser
        console.log(cu);
    }
});
