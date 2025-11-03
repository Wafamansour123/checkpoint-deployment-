import React from 'react'

const LibGameCard = (game) => {

  return (
    <div className='libgamecard' >
        <img src={game.game.image}/>
        <div>{game.game.title}</div>

    </div>
  )
}

export default LibGameCard