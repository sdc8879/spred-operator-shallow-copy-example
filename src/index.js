var http = require("http");

//create a server object:
http
  .createServer(function (req, res) {
    const state = {
      name: "John",
      address: {
        city: "London",
        country: {
          countryName: "United Kingdom",
          countryCode: "UK"
        }
      }
    };

    const copyState = state;
    copyState.name = "Jane";
    console.log("1)-----", copyState === state); // true
    console.log("2)-----", state.name); // 'Jane'

    /**
     *  By using spred operator
     * The spread operator or syntax (...)
     * can be used to make a shallow copy of an object
     *
     *
     * Shallow in this context means that
     *  for any given object that is spread,
     * the uppermost level of
     * the new variable is an object containing
     * the same properties and values of the original object,
     * but at a new reference in memory.
     * Any lower level or nested objects,
     * however, will remain pointing to their original references:
     *
     *
     */
    const shallowCopyState = { ...state };
    shallowCopyState.name = "Jane";
    console.log("3)-----", shallowCopyState === state); // false
    console.log("4)-----", state.name); // 'John'

    /**
     *
     * To copy a deep object like our user object safely,
     * we also need to use the spread operator at the nested
     * level of the object:
     *
     *
     */

    const deeperCopyState = {
      ...state,
      address: {
        ...state.address
      }
    };
    deeperCopyState.address.country.countryCode = "FR";
    console.log("5)-----", deeperCopyState.address === state.address); // false
    console.log(
      "6)-----",
      deeperCopyState.address.country === state.address.country
    ); // true
    console.log("7)-----", state.address.country.countryCode); // 'FR'
    res.write("Hello World!"); //write a response to the client
    res.end(); //end the response
  })
  .listen(8080); //the server object listens on port 8080
