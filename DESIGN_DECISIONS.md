# Design Decisions

## React

Given that VistaPath uses React for the frontend, it makes sense to create this in React; I briefly considered creating it with bare TypeScript and native web components, but communication between disparate components proved more challenging than I expected. React has a lot of known ways to solve this.

## TypeScript

You can't go wrong with TypeScript; type safety and a whole bunch of features that you just don't get out of vanilla JS.

## SCSS and CSS Modules

SCSS makes writing CSS go way faster and make more sense, thanks to it's built-in nesting markup. CSS modules offer a way to escape the nightmare of "whoops, I spelled a className wrong by 1 letter, I guess my layout is going to crack itself in half" by importing them into your components as plain objects you can reference via dot notation. This actually makes BEM syntax difficult to use, as dashes are not valid characters in variable names. Single underscores are used in place of dashes, and triple underscores are used for indicating modifiers.

## Application State

Redux is overkill for most small React projects. I've used a React Context to provide and consume the application state throughout the code.

## Desktop Only

Given the nature of the work being performed by a lab tech, it is unlikely that they will need to utilize this application on anything other than a desktop/laptop, so this is not responsive down to mobile sizes.

## Image Annotation

MarkerJS2 was chosen for ease of implementation. It may not be perfect, but it gets the job done, and it has a serializable data format that makes save/restore much simpler.

## Colors

Some colors were taken from the VistaPath website directly. Others were chose based on the colors taken from the VistaPath site. They could definitely use a bit more review and tweaking
