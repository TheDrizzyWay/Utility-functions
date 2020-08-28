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

/**
 * @description handles sequelize errors
 * @param  {object} error - The error object
 * @returns object containing error code and message
 */

const handleSequelizeError = (error) => {
  let response;
  switch (error) {
    case (error instanceof ValidationError):
      response = { code: 400, msg: error.errors };
      break;
    case (error instanceof UniqueConstraintError):
      response = { code: 409, msg: error.message };
      break;
    case (error instanceof ForeignKeyConstraintError):
      response = { code: 404, msg: error.message };
      break;
    case (error instanceof ConnectionError):
      response = { code: 500, msg: 'could not connect...' };
      break;
    default:
      response = { code: 500, msg: error.message}
      break;
  }
  return response;
};

/**
  * @description clears logs in intervals using node-cron library (in this case 28th of the month)
  * @param {string} interval time interval
  * @returns object without the datavalues keys
  * Sourced from Andela's tembea project
  */
cron.schedule("* * 28 * *", function() {
  console.log("Running Cron Job");
  fs.unlink("./error.log", err => {
    if (err) throw err;
    console.log("Error log file succesfully deleted");
  });
});

