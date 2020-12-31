import React, {useContext} from 'react'

import {useQuery} from '@apollo/react-hooks'
import {AuthContext} from '../context/auth'
import {FETCH_POSTS} from '../utils/GraphqlQueries'

import {Grid, Loader, Transition} from 'semantic-ui-react'

import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'

function Home() {
    const {user} = useContext(AuthContext)
    const {loading, data: { getPosts: posts } = {} } = useQuery(FETCH_POSTS)
    // const content = ''
    const postsContent = loading ? (<Loader active />) : (
        <Grid columns={3}>
            <Grid.Row>
                <h2 className="ui center aligned container">Recent Posts</h2>
            </Grid.Row>
            <Grid.Row>
                {user && (

                    <PostForm/>
                )}
                <Transition.Group>
                    {posts && posts.map(post => (
                        <Grid.Column key={post.id}>
                            <PostCard post={post}/>
                        </Grid.Column>
                    ))}
                </Transition.Group>

            </Grid.Row>
        </Grid>
    )
    return (
        <div>
            {postsContent}
        </div>
    )
}



export default Home;