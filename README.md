# Convention
- JSX variable name should have suffix `UI`
    - This helps distinguish between a data and the JSX
    - For example, suppose that we have a state variable `stories` which stores a list of stories. These stories need to be rendered. 
      So, we have to create an array, that will store the individual story JSXs, before rendering into the actual component.
      So, we should name the array `storiesUI`. 