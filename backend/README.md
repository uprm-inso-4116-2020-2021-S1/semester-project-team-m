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


## API Calls
The following API calls were implemented. Note: **(Auth)** means that a user needs to be authenticated to access this information.

call    | url                                     | description
------- | --------------------------------------- | ----------------------------------------
**GET** | https://terrain.gabrielrosa.dev/api/courses/ | Get the list of courses
**GET** | https://terrain.gabrielrosa.dev/api/courses/{code}/ | Get information about a specific course
**GET** | https://terrain.gabrielrosa.dev/api/mycourses/ | **(Auth)** Get all the courses of a user.
**GET** | https://terrain.gabrielrosa.dev/api/mycourses/{code}/ | **(Auth)** Get information about a specific user's course
**GET** | https://terrain.gabrielrosa.dev/api/grades/ | **(Auth)** Get user's grades
**GET** | https://terrain.gabrielrosa.dev/api/user/ | **(Auth)** Get information about a user (username, email, student id, first name, last name, date joined, and last login.)
**GET** | https://terrain.gabrielrosa.dev/api/curriculum/ | **(Auth)** Get user's curriculum