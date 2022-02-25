import React from 'react';



const ListGroup = (props) => {
    const {genreInfo} = props;

    return (

        <div>
            <ul className="list-group">
                <li className="list-group-item">All Genres</li>
                {genreInfo.map(name => (
                    <li key={name._id} className="list-group-item">{name.name}</li>
                ) )};

            </ul>
        </div>
    );
};

export default ListGroup;
