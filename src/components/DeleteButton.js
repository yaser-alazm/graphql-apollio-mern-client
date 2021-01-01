import React, {useState} from 'react'
import {useMutation} from '@apollo/react-hooks'
import {Button, Confirm} from 'semantic-ui-react'

import {DELETE_POST, DELETE_COMMENT, FETCH_POST,FETCH_POSTS} from '../utils/GraphqlQueries'

function DeleteButton({postId, deletePostCB, commentId}) {

    const [confirm, setConfirm] = useState(false)

    const mutation = commentId ? DELETE_COMMENT : DELETE_POST

    const [deletePostOrComment] = useMutation(mutation, {
        variables: {
            postId,
            commentId
        },
        update(proxy, result){
            //close confirm window
            setConfirm(false)

            if(!commentId) {
                // remove post from apollo cache
                const data = proxy.readQuery({
                    query: FETCH_POSTS
                })
                let newData = [...data.getPosts]
                newData = data.getPosts.filter(post => post.id !== postId)
                // console.log(newData)

                proxy.writeQuery({
                    query: FETCH_POSTS,
                    data: {
                        ...data,
                        getPosts: newData
                    }
                })
            } else {

                // TODO: REMOVE DELETED COMMENT FROM APOLLO CACHE

                // // remove comment from apollo cache
                // const data = proxy.readQuery({
                //     query: FETCH_POST
                // })
                // let newData = [...data.getPost]
                // newData = data.getPost.comments.filter(comment => comment.id !== commentId)
                // // console.log(newData)

                // proxy.writeQuery({
                //     query: FETCH_POST,
                //     data: {
                //         ...data,
                //         getPost: newData
                //     }
                // })
            }

            // callback redirect to homepage
            deletePostCB && deletePostCB()
        }
    })

    return (
        <>
            <Button
                color="red"
                icon="close"
                floated="right"
                size='mini'
                onClick={() => setConfirm(true)}
            />
            <Confirm
                open={confirm}
                content="You sure you want to delete it? After delete you cannot recover it again."
                onCancel={() => setConfirm(false)}
                onConfirm={deletePostOrComment}
            />
        </>
    )
}
export default DeleteButton