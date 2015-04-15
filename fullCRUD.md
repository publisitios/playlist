#Str8 CRUDin'

> The goal of tonight's homework is to build a small web application that is capable of CRUDing a single resource.

> All web applications are essentially built upon this concept. Generally many resources relate to each other in some way; but we should always be able to CREATE, READ, UPDATE and DELETE them.

> Remember that we need to use 'method overrides' in order to PUT and DELETE from forms. This is an annoyance, but you'll soon forget about it.

> <a href="https://gist.github.com/h4w5/8848398">Here</a> is a link to a great HTML forms cheatsheet, written by the esteemed <a href="https://github.com/h4w5"> P.J. Hughes</a>

> And finally, this homework will possibly tempt you to simply copy code from earlier today. Referencing code is fine, but copying code over will be detrimental. Every time you reference past work for your work tonight, force yourself to explain exactly what the code you're referencing is doing.


###If you're feeling shaky....
Build a browser-based application that CRUDs patients for a doctor. Each patient should have a name, age and favorite prescription.

Before starting, take some time to diagram out the behavior of your application. What should the user see and when? When should they be redirected and to where?

Remember, the goal here is to practice CRUD and writing these routes in Express. Visuals are meaningless here. Don't use any CSS.

Your application should have the following routes:

`get '/'`
- displays a welcome page

`get '/patients'`
- displays all the patients

`get /patients/:id`
- displays a single patient

`get '/patients/new'`
- displays a form to create new patients

`get '/patients/:id/edit'`
- displays a form to edit existing patients

`put '/patients/:id'`
- updates a given patient in the databse

`post '/patients'`
- posts a new patient to the database

`delete '/patients/:id'`




###If you're feeling more confident...

Choose a resource, and design a browser-based application capable of CRUDing said resource. Your app must:
  - Allow users to Create a resource.
  - Allow users to Read an individual resource.
  - Allow users to Read all instances of a resource.
  - Allow users to Update resources.
  - Allow users to Delete resources.


###If you're feeling sinister...
- <a href"http://en.wikipedia.org/wiki/If_You%27re_Feeling_Sinister"> is a classic </a>
