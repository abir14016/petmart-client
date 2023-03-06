import React, { useEffect, useState } from 'react';
import Post from '../Post/Post';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch("posts.json")
            .then(res => res.json())
            .then(data => setPosts(data));
    }, [])
    return (
        <div className="md:grid grid-cols-3 gap-4 px-2 md:px-8 lg:px-16">
            <div className="col-span-1 border">
                <h2>Create Post</h2>
            </div>
            <div className="col-span-2">
                {
                    posts.map(post => <Post
                        key={post.id}
                        post={post}
                    ></Post>)
                }
            </div>
        </div>
    );
};

export default Posts;