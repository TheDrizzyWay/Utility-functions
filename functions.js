/**
 * @description Returns HTTP response
 * @param  {object} res - The response object
 * @param {number} statusCode - The response status code
 * @param {string} message - The response message
 * @param {array} data - Data returned from server if any
 * @returns status code, message and response data
 */

const httpResponse = (res, statusCode, message, data) => {
  const response = {
    status: statusCode,
    message,
    data,
  };
  return res.status(statusCode).json(response);
};

/**
 * @description Wraps a controller function in a try-catch block
 * @param  {object} req - The request object
 * @param  {object} res - The response object
 * @param {function} controller - The controller function
 * @returns error message if an error is thrown
 */

const tryCatch = controller => async (req, res) => {
  try {
    await controller(req, res);
  } catch (error) {
    // handle error
  }
  return true;
};

/**
 * @description Removes repeated items from an array
 * @param {array} arr - The array to be filtered
 * @returns filtered array
 */

 const removeRepeated = (arr) => [...new Set(arr)];

 /**
  * @description Removes the datavalues key from sequelize results
  * @param {object} newData object containing the results
  * @returns object without the datavalues keys
  * Sourced from Andela's tembea project
  */
 const removeDataValues = (newData) => {
     let sorted = newData;
     if (sorted.dataValues) {
       sorted = sorted.dataValues;
     }

     Object.keys(sorted).map((key) => {
       if (sorted[key] && sorted[key].dataValues) {
         sorted[key] = sorted[key].dataValues;
         const data = RemoveDataValues.removeDataValues(sorted[key]);
         sorted[key] = data;
       } else if (sorted[key]) {
         sorted[key] = sorted[key];
       }
       return sorted;
     });
     return sorted;
   };
