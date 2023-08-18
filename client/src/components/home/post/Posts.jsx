import { useEffect, useState } from 'react';

import { Grid, Box } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import axios from "axios"

//components
import Post from './Post';

const Posts = () => {
    const [posts, getPosts] = useState([]);

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        const fetchData = async () => {
            // let response = await API.getAllPosts({ category: category || '' });
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:5000/posts',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage.getItem('accessToken'),
                },
            };
            axios.request(config)
                .then((response) => {
                    getPosts(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        fetchData();
    }, [category]);

    return (
        <>
            {
                posts?.length ? posts.map(post => (
                    <Grid item lg={3} sm={4} xs={12}>
                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`details/${post._id}`}>
                            <Post post={post} />
                        </Link>
                    </Grid>
                )) : <Box style={{ color: '878787', margin: '30px 80px', fontSize: 18 }}>
                    No data is available for selected category
                </Box>
            }
        </>
    )
}

export default Posts;