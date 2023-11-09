import React from 'react'
import ReactPlayer from 'react-player';

const PropertyPlayer = () => {

    return (
        <div style={{ height: "90vh" }}>
            <ReactPlayer controls="true" playing={true} url="https://www.youtube.com/watch?v=TqxN7bG1mpM"
                width='100%' height='100%' />
        </div>
    )
}

export default PropertyPlayer;