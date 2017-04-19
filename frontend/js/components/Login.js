import {Component, PropTypes} from 'react';
import axios from 'axios';
import {Form} from 'semantic-ui-react';

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
            axios({
                url: "/api",
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    command: "createToken",
                    body: this.state.loginData
                }
            }).then(response => {
                if (response.status == "ok") {
                    localStorage.setItem("token", response.data);
                    localStorage.setItem("email", this.state.loginData.email);
                    this.context.router.history.push("/all");
                }
            })
        }
    }

    render() {
        return (
            <div className="login_wrapper">
                <Form onSubmit={this.login}>
                    <Form.Input placeholder="Имя пользователя" onChange={this.onChangeEmail} ref={(ref) => this._email = ref} />
                    <Form.Input type="password" placeholder="Пароль" onChange={this.onChangePassword} ref={(ref) => this._password = ref} />
                    <Form.Button type="submit" basic>Войти</Form.Button>
                </Form>
            </div>
        )
    }
}

Login.contextTypes = {
    router: PropTypes.object
};

export default Login;