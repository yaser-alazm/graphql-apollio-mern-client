import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'

import {Card,Image,Button} from 'semantic-ui-react'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'

import {AuthContext} from '../context/auth'


function PostCard({post:{id,username,createdAt,body,likesCount,commentsCount, likes, comments}}) {

    const {user} = useContext(AuthContext)

    return (
        <div>
            <Card fluid style={{marginBottom: 20,}}>
                <Card.Content>
                    <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
                    circular
                    />
                    <Card.Header>{username}</Card.Header>
                    <Card.Meta as={Link} to={`/post/${id}`}><Moment fromNow>{createdAt}</Moment></Card.Meta>
                    <Card.Description>{body}</Card.Description>
                </Card.Content>
                <Card.Content extra>

                <LikeButton user={user} post={{id, likes, likesCount}}/>

                <Button
                    basic
                    as={Link}
                    to={`/post/${id}`}
                    size='mini'
                    icon='comment'
                    color='blue'
                    label={{ color:'blue', basic: true, content: commentsCount }}
                    labelPosition='right'
                />
                {user && user.username === username && <DeleteButton postId={id}/>}
                </Card.Content>
            </Card>
        </div>
    )
}

export default PostCard;