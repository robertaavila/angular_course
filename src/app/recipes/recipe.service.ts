import { Injectable } from '@angular/core';
import {Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shopping-list/shopping.service';
import { Recipe } from './recipe.model'

@Injectable()
export class RecipeService {
    recipeSelected = new Subject<Recipe>();
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
          'Pumpkin Pad Thai',
           'We love classic Pad Thai as much as the next person, but try changing it up with new flavors like pumpkin.', 
           'https://i1.wp.com/www.eatthis.com/wp-content/uploads/2019/10/pumpkin-pad-thai-recipe.jpg',
           [new Ingredient('pumpkin', 1), 
            new Ingredient('peanuts', 30)]),
        new Recipe(
          'Shrimp Lo Mein', 
          'Who needs takeout when you can whip up an equally tasty—and much healthier—version at home?', 
          'https://i0.wp.com/www.eatthis.com/wp-content/uploads/2019/01/low-calorie-shrimp-lo-mein.jpg',
          [new Ingredient('shrimp', 20), 
          new Ingredient('pasta', 1)])
      ];

    constructor(private slService: ShoppingService) {

    }  

    getRecipes() {
    return this.recipes.slice();
    }

    addIngredientsToList(ingredient: Ingredient[]) {
      this.slService.addIngredients(ingredient);
    }

    getRecipe(id: number) {
      return this.recipes[id];
    }

    addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes.slice());
    }
}