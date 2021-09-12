import { Button, CssBaseline, Radio, FormControl, FormControlLabel, FormLabel, Paper, RadioGroup, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useHistory } from "react-router-dom";
import { getPost, shareMoment } from '../../actions/posts';

// import useStyles from './styles';
const Schedule = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const classes = useStyles();
    const { id } = useParams();
    const { post } = useSelector((state) => state.posts);
    const [sharePost, setSharePost] = useState({
        name: '', mailId: '', eventMessage: '', date: new Date()
    })

    useEffect(() => {
        dispatch(getPost(id));
    }, [dispatch, id]);

    const handleShare = () => {
        dispatch(shareMoment(id, sharePost, history));
    }

    const changeEvent = (e) => {
        var happyBirthdayMessage = "May the joy that you have spread in the past come back to you on this day. Wishing you a very happy birthday!";
        var anniverseryMessage = "As you celebrate another year together, take a moment to reminisce in the happy memories you’ve created together and to reflect on the lessons learned. May you continue to grow ever stronger. Happy Anniversary.";
        if (e.target.value === "HappyBirthday") {
            setSharePost({ ...sharePost, eventMessage: happyBirthdayMessage });
        } else if (e.target.value === "Anniversery") {
            setSharePost({ ...sharePost, eventMessage: anniverseryMessage });
        }
    }

    if (!post) return null;
    return (
        <>
            <CssBaseline />
            <Paper style={{ padding: '20px', borderRadius: '15px' }} align="center" elevation={6}>
                <Typography variant="h4" gutterBottom >share moments</Typography><br />

                <div><Typography>Title :  {post.title}</Typography></div> <br />
                <div>
                    <TextField variant="outlined"
                        label='name'
                        value={sharePost.name}
                        onChange={(e) => setSharePost({ ...sharePost, name: e.target.value })}>
                    </TextField>
                </div> <br />

                <div><TextField
                    variant="outlined"
                    label='mail-id'
                    value={sharePost.mailId}
                    onChange={(e) => setSharePost({ ...sharePost, mailId: e.target.value })}>
                </TextField>
                </div> <br />
                <div>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup row aria-label="event" name="row-radio-buttons-group" onChange={changeEvent}>
                            <FormControlLabel value="HappyBirthday" control={<Radio />} label="Happy Birthday" />
                            <FormControlLabel value="Anniversery" control={<Radio />} label="Anniversery" />
                            <FormControlLabel value="" control={<Radio />} label="Other" />
                        </RadioGroup>
                    </FormControl>
                </div> <br />
                <div><TextField variant="outlined" multiline value={sharePost.eventMessage} onChange={(e) => setSharePost({ ...sharePost, eventMessage: e.target.value })}></TextField></div> <br />

                <div><Typography>Share your precious moments with your loved once</Typography></div> <br />

                <div><TextField
                    variant="outlined"
                    label='Date'
                    type='date'
                    onChange={(e) => setSharePost({ ...sharePost, date: e.target.value })} />
                </div> <br />
                {/* <div><MobileDatePicker
                    label="Date mobile"
                    inputFormat="MM/dd/yyyy"
                    value={sharePost.date}
                    onChange={(e) => setSharePost({...sharePost, date: e.target.value})}
                    renderInput={(params) => <TextField {...params} />}
                /></div> */}

                <Button color='primary' variant="outlined" onClick={handleShare}>schedule</Button>
            </Paper>
        </>

    )
}

export default Schedule
