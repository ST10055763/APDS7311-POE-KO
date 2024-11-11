 
# KO International Bank – APDS POE Part 2
## Overview

KO International Bank is a web application that allows users to register, log in, and perform international transactions/send money internationally using SWIFT. The application features user authentication, a dashboard for managing and viewing transactions, and various validations to ensure data integrity.

## Features

- User Sign up: Users can create an account with a secure password.
- User Login: Authentication allows users to access their account.
- Transaction Management: Users can initiate international transactions using SWIFT.
- Form Validations (Whitelist and regex): Ensures account numbers, IDs and passwords meet                specified criteria.
- Hashing and salting: Password is hashed and salted using Bcrypt to ensure passwords stay safe
- Express Brute: Used for extra security surrounding user information
- OpenSSL: using ‘https’ to ensure secure communication
- Responsive Design: User-friendly interface across devices.

## Technologies Used

- **Frontend:** React.js
- **Routing:** React Router (Dom)
- **API:** Fetch for making requests to a backend service
- **Styling:** Custom CSS styling
- **Validation:** Regular expressions for form validation


## Updates made from Part 2 Feedback
- We have implemented salting when it comes to our user, this provides extra protection on their passwords (now have salting and hashing)
- Our frontend also runs on HTTPS
- We have implemented addition actions to protect our program such as Express Helmet and Rate Limiting
- We have Implemented NewMan Testing as well
- We have ensured validation is across all our pages (transaction page now also have various validation)


## Features (as of Part 3)
- Employee Login - employees can only log in, they cant sign up, they can only be added in the system either via the database or hard coded in.
- Login - Employees and Customers login using the same login, but based on their usertype(field in the database) they will be taken to their respective dashboards.
- Form Validation - All pages have form validation
- Employee functionality - employees can see all transaction requests made by all users on their dashboard(it only shows the pending requests).
 They then can either accept(verify) or reject the transaction and the transaction will dissapear. All approved(verified) transactions will then show on the Submit to Swift page, which the employee then can
press a button to submit the transaction to swift. This all users the field 'requeststatus' from the database.

### YouTube Link (submission video) (part 2)
-	https://www.youtube.com/watch?v=T2n3GGBQo_c


## Youtube Link (Final Submission Video Part 3)
- https://www.youtube.com/watch?v=vGy4hKLslDI
  
  
