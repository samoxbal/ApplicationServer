import {Component, PropTypes} from 'react';
import $ from 'jquery';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginData: {}
        };
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.login = this.login.bind(this);
    }

    componentDidMount() {
        $('body').removeClass('nav-md').addClass('login');
        this.state.form = {
            email: {
                el: this._email,
                valid: false
            },
            password: {
                el: this._password,
                valid: false
            }
        }
    }

    onChangeEmail(e) {
        var value = e.target.value;
        this.state.form.email.value = value;
        this.state.form.email.valid = value.length > 0
    }

    onChangePassword(e) {
        var value = e.target.value;
        this.state.form.password.value = value;
        this.state.form.password.valid = value.length > 0
    }

    validateForm() {
        var valid = true;
        var form = this.state.form;
        for (let field in form) {
            if (form.hasOwnProperty(field)) {
                if (form[field].valid == false) {
                    form[field].el.classList.add('parsley-error');
                    valid = false;
                } else {
                    this.state.loginData[field] = form[field].value;
                }
            }
        }
        return valid;
    }

    login(e) {
        e.preventDefault();
        if (this.validateForm()) {
            $.ajax({
                url: "/token",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(this.state.loginData)
            }).done((response) => {
                if (response.status == "success") {
                    localStorage.setItem("token", response.token);
                    $('body').removeClass('login').addClass('nav-md');
                    this.context.router.push("/all");
                }
            })
        }
    }

    render() {
        return <div className="login_wrapper">
            <div className="form login_form">
                <section className="login_content">
                    <form onSubmit={this.login}>
                        <h1>Вход в систему</h1>
                        <input type="text" className="form-control email" placeholder="Имя пользователя" onChange={this.onChangeEmail} ref={(ref) => this._email = ref} />
                        <input type="password" className="form-control password" placeholder="Пароль" onChange={this.onChangePassword} ref={(ref) => this._password = ref} />
                        <button type="submit" className="btn btn-default">Войти</button>
                    </form>
                </section>
            </div>
        </div>
    }
}

Login.contextTypes = {
    router: PropTypes.object
};

export default Login;