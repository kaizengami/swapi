# Rijksmuseum surfing app

## [Demo](https://kaizengami.github.io/rijksmuseum-surfing-app/dist/)

## Project Setup

1. Install dependencies: `npm install`
2. Builds the app for production: `npm run prod`
3. Runs the app in the development mode: `npm run dev`

## Checklist

###	Main page
- [x] search
- [x] “Order by” control
- [x] pagination
- [x] tiles with images
- [x] hovering over tile shows the title of the art object
- [x] click on the tile opens information popup
- [ ] implement a smooth transformation of a tile into a pop-up

###	Information popup
- [x] image
- [x] description
- [x] title
- [x] link to the details page

###	Details page
- [x] all info mentioned for information popup
- [x] category
- [x] tags
- [ ] whatever you find useful to show
- [x] click on a category or tag redirects to the main page with query applied

###	Optional
- [x] “Mark as favorite” button to information popup and details page.s
- [ ] “Favorites” button to the main page
- [ ] click on the “Favorites” button
- [ ] filtering and sorting (ordering) should work for items marked as favorites as well.

## Bugs
1. Pagination works up to 9999 tiles, because it has been determined empirically than 9999 cards are available. API "count" property did not work right for pagination.
2. "Number of items per page" control is static even when there are less than 10 cards, which leads to an error.
3. A selected card is not scaling to the center of the screen because of wrong formula in centerSelectedCard(); (components/Cards/Cards.js)
4. There is a performance issue during the CSS filter “blur effect”. Possible blur effect need to be disabled.
5. 
