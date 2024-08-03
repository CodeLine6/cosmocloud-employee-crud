## Cosmocloud Employee CRUD

### Project Overview

This project is a Next.js application that demonstrates CRUD operations for employees, using Cosmocloud API for employee data storage and retrieval. 

### Features

* User Authentication with NextAuth.js
* Employee List with Search, Pagination, and Sorting
* Create, Read, Update, and Delete employee details
* Toast notifications
* Form Validation using zod

### Technologies

* Next.js
* Cosmocloud API
* NextAuth.js
* Zod
* Tailwind CSS
* React
* Axios 

### Getting Started

1. Clone the repository: 

```
git clone https://github.com/CodeLine6/cosmocloud-employee-crud.git
```

2. Install the dependencies:

```
npm install
```

3. Set environment variables:

* `COSMOCLOUD_PROJECT_ID`: Your Cosmocloud project ID
* `COSMOCLOUD_ENV_ID`: Your Cosmocloud environment ID

4. Start the development server:

```
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

### Authentication

The app uses NextAuth.js for user authentication. You can sign in using the provided credentials:

* Username: cosmocloud_admin
* Password: s$3R#%U5

### Usage

Once logged in, you can:

* View a list of all employees.
* Search, paginate, and sort the list.
* Create a new employee by entering details in the form.
* Edit an existing employee by clicking on the "Edit" button.
* Delete an employee by clicking on the "Delete" button.

### Additional Notes

* This is a basic implementation of a CRUD application with Cosmocloud API integration.
* You can further customize and enhance the functionality based on your specific needs.
* The project uses best practices and follows a clean code structure.
* Feel free to contribute to the project and share your improvements.

### License

This project is licensed under the MIT License. 

## 