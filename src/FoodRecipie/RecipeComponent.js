import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from "@mui/material";
import { addToFavorites, removeFromFavorites } from './RecipeSlice';

const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  width: 250px;
  background-color: rgb(223, 222, 222);;
  box-shadow: 0 3px 10px 0 #aaa;
  border-radius:15px;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 150px;
`;
const RecipeName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 10px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const SeeMoreText = styled.span`
  color: #eb3300;
  font-size: 18px;
  text-align: center;
  border: solid 1px #eb3300;
  border-radius: 3px;
  padding: 7px 11px;
  cursor: pointer;
`;
const IngredientsText = styled(SeeMoreText)`
  color: green;
  border: solid 1px green;
  margin-bottom: 10px;
`;
const SeeMore = styled(SeeMoreText)`
  color: green;
  border: solid 1px green;
`;
const FavoriteButton = styled(Button)`
  && {
    margin-top: 10px;
  }
`;

const RecipeComponent = (props) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.recipes.favorites);
  
  const { label, image, ingredients, url } = props.recipe;
  const isFavorite = favorites.some((fav) => fav.uri === props.recipe.uri);

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(props.recipe));
    } else {
      dispatch(addToFavorites(props.recipe));
    }
  };

  return (
    <RecipeContainer>
      <Dialog
        onClose={() => setShow(false)}
        aria-labelledby="simple-dialog-title"
        open={show}
      >
        <DialogTitle>Ingredients</DialogTitle>
        <DialogContent>
          <RecipeName>{label}</RecipeName>
          <table>
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Weight</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ingredient, index) => (
                <tr key={index} className="ingredient-list">
                  <td>{ingredient.text}</td>
                  <td>{ingredient.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => window.open(url)}>See More</Button>
          <Button onClick={() => setShow(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      <CoverImage src={image} alt={label} />
      <RecipeName>{label}</RecipeName>
      <IngredientsText onClick={() => setShow(true)}>Ingredients</IngredientsText>
      <SeeMoreText onClick={() => window.open(url)}>See Complete Recipe</SeeMoreText>
      <FavoriteButton onClick={handleFavorite} variant="contained" color={isFavorite ? "secondary" : "primary"}>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </FavoriteButton>
    </RecipeContainer>
  );
};

export default RecipeComponent;
