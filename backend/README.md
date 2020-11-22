# Terrain
Backend development

## Queries
The most important element for obtaining information from the database is to import the Model from which you want to get the information. After importing the model, you can request all the objects or the objects that first certain criteria.
```python
  Model.objects.all()  # This will get all the Objects in the db

  Model.objects.filter(field=value)  # This will get all the Objects which the field = value. For example,
                                     # if you call MyCourse.objects.filter(email='gabriel.rosa4@upr.edu'),
                                     # it will return all MyCourse objects with that email.
```

## Pandas
In order to generate a dataframe, you need to do the following:

```python
from .models import ModelName

def your_function():
    data = ModelName.objects.all()
    df = data.to_dataframe()
```

Something that we can do is request only certain fields, instead of all.
```python
df = data.to_dataframe(fieldnames=['email', 'grade'])
```

Additionally, we can use the parent's fields to build our dataframe. In this case, we are using the parameters **code**, **title**, **worth**, and **pre** from the **Course** model.
```python
df = data.to_dataframe(fieldnames=['email', 'course__code', 'course__title', 'course__worth', 'grade', 'course__pre'])
```

## Authentication
To implement the authentication, we use Token Authentication. In order to use it, you need to do the following:
* Generate a token
  * Make a POST call to https://terrain.gabrielrosa.dev/api-auth/ and pass in the Body: the username and the password
  * key          | value
    ------------ | -------------
    **username** | *{username}*
    **password** | *{password}*
  * This will return a token that you need to store
* Accessing user-restricted content
  * In order to access a restricted page, you need to pass the token in the Header.
  * key | value
    ------------ | -------------
    **Authorization** | Token *{generated_token}*

  * For testing this, you can access https://terrain.gabrielrosa.dev/courses/api/
* User Registration
  * For registering a new user, you should make a POST call to https://terrain.gabrielrosa.dev/api/register/. Please read the API calls section for detailed information.


## API Calls
The following API calls were implemented. Note: **(Auth)** means that a user needs to be authenticated to access this information.

call    | url                                                   | description
------- | ----------------------------------------------------- | ----------------------------------------
**GET** | https://terrain.gabrielrosa.dev/api/courses/          | Get the list of courses
**GET** | https://terrain.gabrielrosa.dev/api/courses/{code}/   | Get information about a specific course
**GET** | https://terrain.gabrielrosa.dev/api/mycourses/        | **(Auth)** Get all the courses of a user.
**GET** | https://terrain.gabrielrosa.dev/api/mycourses/{code}/ | **(Auth)** Get information about a specific user's course
**GET** | https://terrain.gabrielrosa.dev/api/grades/           | **(Auth)** Get user's grades
**GET** | https://terrain.gabrielrosa.dev/api/user/             | **(Auth)** Get information about a user (username, email, student id, first name, last name, date joined, and last login.)
**GET** | https://terrain.gabrielrosa.dev/api/curriculum/       | **(Auth)** Get user's curriculum

call       | url                                                      | description                                             | parameters                                                              | required
---------- | -------------------------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------------------- | -------------------------------
**POST**   | https://terrain.gabrielrosa.dev/api-auth/                | Generate a token for authentication                     | username <br> password                                                  | Y <br> Y
**POSt**   | https://terrain.gabrielrosa.dev/api/register/                | Register a new user                                     | username <br> password <br> student_id <br> major <br> curriculum_year  | Y <br> Y <br> Y <br> Y <br> Y
**POST**   | https://terrain.gabrielrosa.dev/api/courses/             | **(Auth)** Create a new course                          | code <br> title <br> worth <br> pre <br> curriculum                     | Y <br> Y <br> Y <br> N <br> Y
**POST**   | https://terrain.gabrielrosa.dev/api/mycourses/           | **(Auth)** Add a taken course to my profile             | course <br> grade <br> term                                             | Y <br> Y <br> Y
**PUT**    | https://terrain.gabrielrosa.dev/api/courses/{code}/      | **(Auth)** Modify information about a course            | code <br> title <br> worth <br> pre <br> curriculum                     | N <br> N <br> N <br> N <br> N
**PUT**    | https://terrain.gabrielrosa.dev/api/mycourses/{code}/    | **(Auth)** Modify the information about a taken course  | course <br> grade <br> term                                             | N <br> N <br> N
**DELETE** | https://terrain.gabrielrosa.dev/api/courses/{code}/      | **(Auth)** Remove a course                              | |
**DELETE** | https://terrain.gabrielrosa.dev/api/mycourses/{code}/    | **(Auth)** Remove a course from my profile          | |

### Format
- The parameter {code} in the API url should be replaced with the course code in a format similiar to this: CIIC3010 or ciic3010
- | parameter      | description                                                        | example                 |
  | -------------- | ------------------------------------------------------------------ | ----------------------- |
  | username       | username of the person trying to access the information            | gabriel.rosa4@upr.edu   |
  | password       | password of the person trying to access the information            | SecR3TP2Z$worD          |
  | student_id     | the student id of the user (max length: 9)                         | 802192020               |
  | major          | the major of the user (max length: 4)                              | INSO                    |
  | curriculum_year| the year of curriculum that the user is enrolled (max length: 4)   | 2015                    |
  | code           | course code                                                        | INSO4116                |
  | title          | title of the new course (in english)                               | Software Design         |
  | worth          | amount of credits that the course is worth                         | 4                       |
  | pre            | course(s) required before taking this course                       | [INSO4115]              |
  | curriculum     | the curriculum(s) in which this course is REQUIRED                 | [INSO2015]              |
  | course         | course code                                                        | INSO4116                |
  | grade          | grade received in this course (A, B, C, D, F, P)                   | A                       |
  | term           | the term/period in which the course was taken                      | 2015S1                  |
