import { API_URL } from "./config";

export const state = {
    questions: [],
    categories: [],
    currQuestion: 0,
    highScorer: {},
}

export const getCategories = async function() {
    const res = await fetch(`${API_URL}/api_category.php`);
    const {trivia_categories} = await res.json();
    state.categories = trivia_categories;
}