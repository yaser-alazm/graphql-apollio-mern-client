import React, {useContext} from 'react'
import {useMutation} from '@apollo/react-hooks'
import {AuthContext} from '../context/auth'

import {Grid,Form, Button} from 'semantic-ui-react'

import {useForm} from '../utils/hooks'
import {REGISTER_USER} from '../utils/GraphqlQueries'

function Register(props) {

    const context = useContext(AuthContext)

    // TODO: setup errors
    // const [errors, setErrors] = useState({})

    const {values, onChange,onSubmit} = useForm(addUserCallback, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })


    const [addUser, {loading}] = useMutation(REGISTER_USER, {
        update(_,{data: {register: userData}} = {}) {
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

    // a function to make addUser() function recognized in useForm()
    // passing addUser function directly to useForm will not work because addUser not declared before
    function addUserCallback(){
        addUser()
    }

    return (
        <Grid centered columns={2}>
            <Grid.Row>
                <h2 className="ui center aligned container">Register a new user</h2>
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
                        label="Email"
                        placeholder="Email"
                        name="email"
                        type="email"
                        value= {values.email}
                        onChange={onChange}
                        // error= {errors.email ? true : false}
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
                    <Form.Input
                        label="Confirm Password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value= {values.confirmPassword}
                        onChange={onChange}
                        // error= {errors.confirmPassword ? true : false}
                    />
                    <Button
                        type="submit"
                        content="Register"
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

export default Register;
