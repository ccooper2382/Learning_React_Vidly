import React from 'react';



const ListGroup = (props) => {
    const {genreInfo, onGenreSort} = props;

    return (

        <div>
            <ul className="list-group">
                <li className="list-group-item">All Genres</li>
                {genreInfo.map(genre => (
                    <li key={genre._id} className="list-group-item">
                        <a className="page-link" onClick={() => onGenreSort(genre._id)} >{genre.name}</a>
                    </li>
                ) )};

            </ul>
        </div>
    );
};

export default ListGroup;
