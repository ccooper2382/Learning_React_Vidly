import React from 'react';

const Like = (props) => {

    let classes = "";
    if (!props.liked) {
        classes = "bg-white text-black";
    } else {
        classes = "bg-black text-white";
    }
    return (
        <div>
            <button onClick={props.onClick} className={classes}>Like</button>
        </div>
    );
}


export default Like;