import React from '../react';
import { PhotoStory, VideoStory } from './Stories';

const components = {
    photo: PhotoStory,
    video: VideoStory
};

function Story(props){
    //correct! JSX type can be a capitalized variable.
    const SpecificStory = components[props.storyType];
    return <SpecificStory story={props.story} />
}

export default Story;