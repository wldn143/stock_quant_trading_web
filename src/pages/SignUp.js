

function SignupPage(){

    let accessCode = new URL(window.location.href).searchParams.get('code');
    /* URL에 있는 인가코드를 변수에 저장하는 로직. */

    return <div>
        signup
    </div>
}

export default SignupPage;