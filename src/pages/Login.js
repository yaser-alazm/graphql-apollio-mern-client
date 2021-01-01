import React, {useContext} from 'react'
import {useMutation} from '@apollo/react-hooks'
import {AuthContext} from '../context/auth'

import {Grid,Form, Button} from 'semantic-ui-react'

import {useForm} from '../utils/hooks'
import {LOGIN_USER} from '../utils/GraphqlQueries'

function Login(props) {

    const context = useContext(AuthContext)

    // TODO: setup errors
    // const [errors, setErrors] = useState({})

    const {values, onChange,onSubmit} = useForm(loginUserCallback, {
        username: '',
        password: '',
    })


    const [loginUser, {loading}] = useMutation(LOGIN_USER, {
        update(_,{data:{login: userData} = {}}) {
            context.login(userData)
            props.history.push('/')
            // console.log(userData)
        },
        onError(err) {
            // setErrors(err.graphQLErrors[0].extensions.exception.errors)
            console.log(err)
        },
        variables: values
    })

    // a function to make loginUser() function recognized in useForm()
    // passing loginUser function directly to useForm will not work because loginUser not declared before
    function loginUserCallback(){
        loginUser()
    }

    return (
        <Grid centered columns={2}>
            <Grid.Row>
                <h2 className="ui center aligned container">User Login</h2>
            </Grid.Row>
            <Grid.Column>
                <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                    <Form.Input
                        label="Username"
                        placeholder="Username"
                        name="username"
                        type="text"
                        value= {values.username}
                        onChange={onChange}
                        // error= {errors.username ? true : false}
                    />
                    <Form.Input
                        label="Password"
                        placeholder="Password"
                        name="password"
                        type="password"
                        value= {values.password}
                        onChange={onChange}
                        // error= {errors.password ? true : false}
                    />
                    <Button
                        type="submit"
                        content="Login"
                    />
                </Form>

                {/* {Object.keys(errors).length > 0 && (
                    <div className="ui message error">
                        <ul className="list">
                            {Object.values(errors).map(error => (
                                <li key={error}>{error}</li>
                            )
                            )}
                        </ul>
                    </div>
                )} */}
            </Grid.Column>
        </Grid>
    )
}


export default Login;
