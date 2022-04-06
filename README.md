# Calculator

This is a [Free Code Camp](https://www.freecodecamp.org/) final project. It features the ability to add, subtract, 
divide and multiply any combination of numbers including decimals and negative numbers.


## Tools

This is a React.js based application.

##Challenges

The biggest challenge was getting the operators to play nicely with the rest of the app. Being able to limit the amount 
of consecutive operators took a lot of work with Regular Expressions, which is something I still find a little hard to 
grasp but this project definitely helped me in understanding them a little more.

Another thing I could have done better was use some form of reducer, either through React's useReducer() hook, or an
external library like Redux, as it would have meant I could spread the code out a lot more instead of having it all 
funnel through one massive parseInt() function. One of the things I plan to do is look back into this project and 
reimplementing it with a reducer.

## Known Issues

Currently the biggest known issues are the fact that all the operator changes occur on component refresh and are not 
instant, currently I'm not as well versed in React to be able to make it happen completely live. Another issue on a 
similar tangent is working with decimals, it relies on the formula array to update before it changes any instances of a 
singular decimal without a preceding digit to a better formatted decimal digit ("." to "0.").