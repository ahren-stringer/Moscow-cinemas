import React from 'react';
import 'materialize-css'
import { useMessage } from '../../Hooks/message.hook';
import axios from 'axios';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, setLoaded } from '../../redux/authReduser'
import { Field, reduxForm } from 'redux-form'
import { required, aol, email} from '../../validators'

const input = ({ input, label, type, meta: { touched, error, warning } }) => {

    return (<div className="row">
        <div className="input-field col s12">
            <input {...input} id={type} type={type} className="validate" />
            <label for={type}>{label}</label>
            {touched &&
                ((error && <span>{error}</span>) ||
                    (warning && <span>{warning}</span>))}
        </div>
    </div>)
}

function AuthForm(props) {
    
    const { submitting } = props

    return <form onSubmit={props.handleSubmit}>
        <div className="row">
            <Field
                name="email"
                type="email"
                component={input}
                label="Email"
                validate={[required, email]}
                warn={aol}
            />
            <Field
                name="password"
                type="password"
                component={input}
                label="Password"
                validate={[required]}
                warn={aol}
            />
            <button className='btn' style={{ marginLeft: "10px", marginRight: "10px" }} type="submit" disabled={submitting}>
                Войти
            </button>
            <NavLink to='/register'>
                <button className='btn'>
                    Зарегистрироваться
                </button>
            </NavLink>
        </div>
    </form>
}

AuthForm = reduxForm({ form: 'auth' })(AuthForm)

function Auth(props) {
    debugger
    let message = useMessage();

    let submit = async (formData) => {
        //props.loginThunk(formData.email, formData.password, formData.rememberMe)
        try {
            const req = await axios.post('http://localhost:8001/cinema/login', { ...formData })
            props.login(req.data.token, req.data.userId)
            props.history.goBack()
        } catch (e) { }
    }

    return <div class="container">
        <div style={{ marginLeft: "10px" }}>
            <h4>Войти:</h4>
        </div>
        <AuthForm onSubmit={submit} />
    </div>
}

let mapStateToProps = (state) => {
    return {
        login: state.auth.login,
    }
}

export default connect(mapStateToProps, {})(withRouter(Auth));

