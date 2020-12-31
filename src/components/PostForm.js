import React from 'react'
import {useMutation} from '@apollo/react-hooks'
import {Form, Grid, Button} from 'semantic-ui-react'

import {useForm} from '../utils/hooks'
import {FETCH_POSTS, CREATE_POST} from '../utils/GraphqlQueries'

function PostForm() {

    const {values, onSubmit, onChange} = useForm(postFormCallback, {
        body: ''
    })

    const [createPost, {error}] = useMutation(CREATE_POST, {
        variables: values,
        update(proxy, result){

            // use apollo caching
            const data = proxy.readQuery({
                query: FETCH_POSTS,
            });
            proxy.writeQuery({
                query: FETCH_POSTS,
                data: {
                    getPosts: [result.data.createPost, ...data.getPosts],
                },
            });
            values.body = "";
        }
    })

    function postFormCallback() {
        createPost()
    }

    return (
        <Grid.Column>
            <Form>
                <h1>Create a post</h1>
                <Form.Field>
                    <Form.Input
                        placeholder= "Type here .."
                        name= "body"
                        type="text"
                        onChange={onChange}
                        value={values.body}
                    />
                    <Button
                        content="Post"
                        type="submit"
                        onClick={onSubmit}
                    />
                </Form.Field>
            </Form>
        </Grid.Column>
    )
}

export default PostForm
