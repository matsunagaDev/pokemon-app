import React from 'react';
import './Card.css';
const Card = ({ pokemon }) => {
  return (
    <div className="card">
      <div className="cardImg">
        <img src={pokemon.sprites.front_default} />
      </div>
      <h3 className="cardName">{pokemon.name}</h3>
      <div className="cartType">
        <div>タイプ</div>
        {pokemon.types.map((typeInfo, index) => {
          return (
            <div>
              <span key={index} className="typeName">
                {typeInfo.type.name}
              </span>
            </div>
          );
        })}
      </div>
      <div className="cardInfo">
        <div className="cardData">
          <p>重さ：{pokemon.weight}kg</p>
        </div>
        <div className="cardData">
          <p>高さ：{pokemon.height}m</p>
        </div>
        <div className="cardData">
          <p>アビリティ：{pokemon.abilities[0].ability.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
