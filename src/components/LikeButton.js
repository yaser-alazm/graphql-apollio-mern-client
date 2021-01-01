import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import {LIKE_POST} from '../utils/GraphqlQueries';
import { Button, Label, Icon } from 'semantic-ui-react';

const LikeButton = ({user, post: {id, likes, likesCount, loading} = {}}) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // if (user && likes.find((like) => like.username === user.username)) {
    //   setLiked(true);
    // } else setLiked(false);

    if (!loading && likes && user && likes.find((like) => like.username === user.username)) {

      setLiked(true);

    } else setLiked(false);
    // console.log(likes.find((like) => like.username === user.username))

  }, [user, likes, loading]);

  const [likePost] = useMutation(LIKE_POST, {
    variables: { postId: id }
  });

  // function likePost() {
  //     console.log(likes)
  // }

  const likeButton = user ? (
    liked ? (
      <Button color="violet" size="mini">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="violet" size="mini" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="violet" size="mini" basic>
      <Icon name="heart" />
    </Button>
  );

  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      {likeButton}
      <Label basic color="violet" pointing="left">
        {likesCount}
      </Label>
    </Button>
  );
}

export default LikeButton;