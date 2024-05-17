import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import styled from "styled-components";
import { fetchRecipes, updateSearchQuery } from './FoodRecipie/RecipeSlice';
import RecipeComponent from './FoodRecipie/RecipeComponent';
import debounce from 'lodash.debounce';
import './App.css'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 6px 6px;
  border-radius: 6px;
  margin-left: 20px;
  width: 30%;
  background-color: white;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const RecipeListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 20px;
  justify-content: space-evenly;
`;
const FavoritesListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 15px;
  gap: 10px;
  justify-content: space-evenly;
`;

const Footer=styled.div`
background-color: black;
color: white;
margin-top:10%;
text-align:center;
padding:38px;
font-size: 18px;
font-weight: 400;
`
const Contact=styled.div`
  display:flex;
  flex-direction:row;
  justify-content:center;
  margin-top:10px;
`
const AppComponent = () => {

  const dispatch = useDispatch();
  const { recipeList, searchQuery, status, favorites } = useSelector((state) => state.recipes);

  const fetchRecipesDebounced = useCallback(
    debounce((query) => {
      dispatch(fetchRecipes(query));
    }, 500),
    []
  );

  useEffect(() => {
    if (searchQuery) {
      fetchRecipesDebounced(searchQuery);
    }
  }, [searchQuery, fetchRecipesDebounced]);

  const onTextChange = (e) => {
    dispatch(updateSearchQuery(e.target.value));
  };

  return (
    <>
    <Container>
      <Header>
        <AppName>
        <i class="fa-solid fa-burger"></i>
          Recipe Finder
        </AppName>
        <SearchBox>
        <i class="fa-solid fa-magnifying-glass" style={{color:"grey"}}></i>
          <SearchInput
            placeholder="Search..."
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      <h2 className="searchResult">Search Results</h2>
      <RecipeListContainer>
        {status === 'loading' ? (
          <p style={{color:"green", fontSize:"25px"}}>loading...</p>
        ) : (
          recipeList.map((recipe, index) => (
            <RecipeComponent key={index} recipe={recipe.recipe}/>
          ))
        )}
      </RecipeListContainer>
      <h2 className="searchResult">Favorites</h2>
      <FavoritesListContainer>
        {favorites.length > 0 ? (
          favorites.map((recipe, index) => (
            <RecipeComponent key={index} recipe={recipe} />
          ))
        ) : (
          <h4>No Favorite Items</h4>
        )}
      </FavoritesListContainer>
      <Footer>
      <div className="contact">Contact Info</div>
      <Contact>
        <div><i class="fa-brands fa-instagram" style={{marginRight:"35px", fontSize:"25px"}}></i></div>
        <div><i class="fa-brands fa-facebook-f" style={{marginLeft:"35px" , fontSize:"25px"}}></i></div>
        <div><i class="fa-brands fa-x-twitter" style={{marginLeft:"40px" , fontSize:"25px"}}></i></div>
      </Contact>
     </Footer>
    </Container>
     
     </>
  );
};

export default AppComponent;
