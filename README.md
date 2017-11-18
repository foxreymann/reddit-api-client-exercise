# description

job interview task for Hearst Magazines

# task

You will be judged on design approach, code quality and speed of execution.

Please write a JS file (can be a script, module, function, etc) that does the following:

Hit this URL `https://www.reddit.com/r/aww.json` where the result is `json` and retrieve the `json.data.children` array. Iterate through that array and retrieve the `author` property for each of the children.

Using the author property, Hit this URL `https://www.reddit.com/user/[AUTHOR]/about.json` where [AUTHOR] is the author property and retrieve the `link_karma` and `comment_karma` fields.
Generate a JSON file that resembles this structure:

````
[
  {
    author: “XX”,
    link_karma: 0,
    comment_karma:0,
  },
  {
    author: “XX”,
    link_karma: 0,
    comment_karma:0,
  },
  ...
]
````
You can use (or not use) any npm modules you see fit.

Adding a comment at the top of the json file with the speed of execution in seconds will be viewed favorably.
