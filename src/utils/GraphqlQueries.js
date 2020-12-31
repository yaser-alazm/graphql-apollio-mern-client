import gql from 'graphql-tag'

export const FETCH_POSTS = gql`
    query{
        getPosts{
            id body createdAt username likesCount
            likes {
                username
            }
            commentsCount
            comments {
                username
                body
                createdAt
            }
        }
    }
`

export const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ){
        login(
            username: $username
            password: $password
        ){
            id username email createdAt token
        }
    }
`

export const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ){
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ){
            id username email createdAt token
        }
    }
`

export const CREATE_POST = gql`
    mutation createPost($body: String!){
        createPost(body: $body){
            id body createdAt username likesCount commentsCount
            likes {
                id username createdAt
            }
            comments {
                id username body createdAt
            }
        }
    }
`

export const LIKE_POST = gql`
    mutation createLike($postId: ID!){
        createLike(postId: $postId) {
            id
            likes {
                id
                username
            }
            likesCount
        }
    }
`

export const FETCH_POST = gql`
    query getPost($postID: ID!){
        getPost(postID: $postID) {
            id username body createdAt likesCount commentsCount
            likes{
                id
                username
            }
            comments{
                id
                username
                body
            }
        }
    }
`

export const DELETE_POST = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`

export const DELETE_COMMENT = gql`
    mutation deleteComment( $postId: ID!, $commentId: ID! ){
        deleteComment(postId: $postId, commentId: $commentId){
            id
            username
            comments {
                id
                username
                body
            }
            commentsCount
        }
    }
`

export const CREATE_COMMENT = gql`
    mutation createComment($postId: ID!, $body: String!){
        createComment(postId: $postId, body: $body){
            id commentsCount
            comments {
                id
                body
                createdAt
            }
        }
    }
`