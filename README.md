# Valod
A simple NodeJS server side form validator

**INSTALLATION**:

```
npm install valod
```

Very easy to use:
## Usage Example:

```javascript
var valod = require('valod');

var norms = {
    email: [['email'],"email not Valid"],
    name: [['required','alphanum'], 'Invalid Name']
}
var validation = new valod(norms);

// json object representing form data received in post request
var form = {
    name: '1sd'
}

var res = validation.check(form)
if(res.valid){
    console.log('Success')
}else{
    console.log(res.errors);
}

// output: Success

form = {
    email: 'mohmail.com',
}

var res = validation.check(form)
if(res.valid){
    console.log('Success')
}else{
    console.log(res.errors);
}

// output: [ 'email not Valid', 'Invalid Name' ]
```

## Norms

- 'required': Field is required
- 'email': Field is a valid email
- 'numeric': Field is a numeric value
- 'alphanum': Field is an alphanumeric value
- 'maxln': Max length of field. Ex:
    ```javascript
    // for max length of 4 characters
    var norms = {
        name: [['maxln4'],"name is too long"]
    }
    ```
- 'minln': Min length of field
- 'max': Max value (For numeric fields only). Ex:
    ```javascript
    // for max value 4
    var norms = {
        age: [['max4'],"age is too big"]
    }
    ```
- 'min': Min value (For numeric fields only)
