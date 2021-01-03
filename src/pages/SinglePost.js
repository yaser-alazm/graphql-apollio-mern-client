import React, {useContext, useState} from 'react'

import {Grid, Loader, Image, Card, Button, Form} from 'semantic-ui-react'
import Moment from 'react-moment'

import {useQuery, useMutation} from '@apollo/react-hooks'

import {AuthContext} from '../context/auth'
import {FETCH_POST, CREATE_COMMENT} from '../utils/GraphqlQueries'
import LikeButton from '../components/LikeButton'
import DeleteButton from '../components/DeleteButton'

function SinglePost(props) {

    const {user} = useContext(AuthContext)
    const [post,setPost] = useState({
        post: {}
    })

    const [comment, setComment] = useState('')

    const {loading ,data} = useQuery(FETCH_POST, {
        variables: {
            postID: props.match.params.postId
        },
        onCompleted() {
            setPost(data.getPost)
            // console.log(data.getPost)
        }
    })

    const {id,username, body, createdAt, likes, likesCount, comments, commentsCount, userAvatar} = post

    const resizedAvatar = userAvatar ? userAvatar.split('.jpg')[0] + '?s=200' : 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
    // console.log(resizedAvatar)

    const [createComment] = useMutation(CREATE_COMMENT, {
        update() {
            setComment('')
        },
        variables: {
            postId: id,
            body: comment
        }
    })

    function deletePostCB() {
        props.history.push('/')
    }


    const postContent = (
        <Grid columns={2} >
            <Grid.Row>
            <h3 className="ui center aligned container">Post Content </h3>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width="4" >
                    <Image size='small' src={resizedAvatar} />
                </Grid.Column>

                <Grid.Column width="12" >
                    <Card fluid>
                        <Card.Content>
                            <Card.Header>{username}</Card.Header>
                            <Card.Meta><Moment fromNow>{createdAt}</Moment></Card.Meta>
                            <Card.Description>
                                {body}
                            </Card.Description>
                        </Card.Content>
                        <Card.Content>

                            <LikeButton user={user} post={{id, likes, likesCount, loading}} />
                            <Button
                                basic
                                as="div"
                                size='mini'
                                icon='comment'
                                color='purple'
                                label={{ color:'purple', basic: true, content: commentsCount }}
                                labelPosition='right'
                                onClick={() => console.log('Comment Post ..')}
                            />

                            {user && user.username === username && (
                                <DeleteButton postId={id} deletePostCB={deletePostCB}/>
                            )}

                        </Card.Content>
                    </Card>
                    {user && (
                        <Card fluid>
                            <Card.Content>
                                <Form>
                                    <Form.Input
                                        type="text"
                                        name="comment"
                                        value={comment}
                                        content="Send a comment .."
                                        onChange={e => setComment(e.target.value)}
                                    />
                                    <Button
                                        type="submit"
                                        onClick={createComment}
                                        color="violet"
                                        icon="play"
                                        content="Submit"
                                        disabled={comment.trim() === ''}
                                    />
                                </Form>
                            </Card.Content>
                        </Card>
                    )}
                    {comments && comments.length > 0 && comments.map(comment => (
                        <Card fluid key={comment.id}>
                            <Card.Content>
                                {user && user.username === comment.username && (
                                    <DeleteButton postId={id} commentId={comment.id} />
                                )}
                                <Card.Header>{comment.username}</Card.Header>
                                <Card.Meta><Moment fromNow>{comment.createdAt}</Moment></Card.Meta>
                                <Card.Description>{comment.body}</Card.Description>
                            </Card.Content>
                        </Card>
                    ))}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )

    return loading ? <Loader active /> : postContent
}

export default SinglePost