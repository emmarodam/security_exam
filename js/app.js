// ##########################################################################################

// SOLVED/NOT SOLVED ////////////////////
// Handles a case to solved or not solved
function toggleCaseSolved(caseId, currentStatus) {

  // Determine the new status based on the current status
  const newStatus = currentStatus === 1 ? 0 : 1;

  // Create a new FormData object to send data via POST request
  const formData = new FormData();

  // Append case ID
  formData.append('case_id', caseId);

  // Append the new solved status
  formData.append('case_solved', newStatus);

  // Send a POST request to the update case API endpoint
  fetch('../api/api-update-case.php', {

      // Use POST method
      method: 'POST',

      // Attach form data
      body: formData
  })

  // Parse the JSON response
  .then(response => response.json())
  .then(data => {

      // Check if there's an error in the response
      if (data.error) {

          // If error, throw an error with the message
          throw new Error(data.error);
      }

      // Get the case element by ID
      const caseElement = document.getElementById(`case-${caseId}`);
      if (caseElement) {

          // If the case element exists, update the solved status display
          const solvedStatusElement = caseElement.querySelector('.case-solved');
          solvedStatusElement.textContent = newStatus ? 'Yes' : 'No';

          // Update the onclick attribute of the toggle button to reflect the new status
          const toggleButton = caseElement.querySelector('.toggle-button');
          toggleButton.setAttribute('onclick', `toggleCaseSolved('${caseId}', ${newStatus})`);
      } else {

          // If the case element doesn't exist, log an error
          console.error('Case element not found:', caseId);
      }

      // Reload the page to reflect the changes
      location.reload();
  })
  .catch(error => {

      // Catch any errors that occur during the process and log them
      console.error('Error updating case solved status:', error);
  });
}

// ##########################################################################################

// MAKE CASE ////////////////////
// Handles to make a case
async function makeCase(){

  // Access the form element triggering the event
  const frm = event.target  
  console.log(frm)

  // Send a POST request to the api-make-case.php endpoint
  const conn = await fetch("/api/api-make-case.php", {

    // Use POST method
    method : "POST",

    // Attach form data to the request
    body : new FormData(frm)
  })

  // Parse the response as text
  const data = await conn.text()
  console.log(data) 

  // Reload the page to reflect the changes
  location.reload();
}

// ##########################################################################################

// TIP ////////////////////
// Handles a case to make a tip

function addTip() {

  // Get the case ID and tip from the form elements
  const caseId = document.getElementById('case_id_tip').value;
  const caseTip = document.getElementById('case_tip').value;

  // Create a FormData object and append the case ID and tip
  const formData = new FormData();
  formData.append('case_id', caseId);
  formData.append('case_tip', caseTip);

  // Send a POST request to the api-update-case.php endpoint
  fetch('../api/api-update-case.php', {

      // Use POST method
      method: 'POST',

      // Attach form data to the request body
      body: formData
  })

  // Parse response as JSON
  .then(response => response.json())
  .then(data => {

      // Check if the response contains an error
      if (data.error) {

          // Throw an error if an error message is received
          throw new Error(data.error);
      }

      // Reload the page to reflect the changes
      location.reload();
  })
  .catch(error => {

      // Log any errors that occur during the process
      console.error('Error adding tip:', error);
  });
}

// ##########################################################################################

// PRIVATE/PUBLIC CASES ////////////////////
// Handles a case that is private or public

function toggleCaseVisibility(caseId, currentStatus) {

  // Determine the new visibility status based on the current status
  const newStatus = currentStatus === 1 ? 0 : 1;

  // Create a FormData object and append the case ID and new visibility status
  const formData = new FormData();
  formData.append('case_id', caseId);
  formData.append('case_is_public', newStatus);

  // Send a POST request to the api-update-case.php endpoint
  fetch('../api/api-update-case.php', {

      // Use POST method
      method: 'POST',

      // Attach form data to the request body
      body: formData
  })

  // Parse response as JSON
  .then(response => response.json())
  .then(data => {

      // Check if the response contains an error
      if (data.error) {

          // Throw an error if an error message is received
          throw new Error(data.error);
      }

      // Get the case element by its ID
      const caseElement = document.getElementById(`case-${caseId}`);
      if (caseElement) {

          // Update the visibility status element text content
          const visibilityStatusElement = caseElement.querySelector('.case-visibility');
          visibilityStatusElement.textContent = newStatus ? 'Yes' : 'No';

          // Update the toggle visibility button onclick attribute
          const toggleVisibilityButton = caseElement.querySelector('.toggle-visibility-button');
          toggleVisibilityButton.setAttribute('onclick', `toggleCaseVisibility('${caseId}', ${newStatus})`);
      } else {

          // Log an error if the case element is not found
          console.error('Case element not found:', caseId);
      }
    
      // Reload the page to reflect any changes
      location.reload();
  })
  .catch(error => {

      // Log any errors that occur during the process
      console.error('Error updating case visibility status:', error);
  });
}

//////////////////////////////////////////////////////////////////////////////////////////

// Hide logout button on signup/login page

// Check if the current pathname matches the specified views
if (window.location.pathname === '../views/signup.php', '../views/login.php') {

  // Define a function to hide the navigation section
  function hideSection() {

      // Get the navigation section element by its ID
      const sectionToHide = document.getElementById('navigation');

      // Check if the navigation section exists
      if (sectionToHide) {

          // Set the display style of the navigation section to 'none' (hide it)
          sectionToHide.style.display = 'none';
      }
  }

  // Execute the hideSection function when the window is fully loaded
  window.onload = hideSection;
}
  
// ##########################################################################################
  
// Toggle Blocked ////////////////////
// Switches between "Blocked" and "Unblocked" inside a user based on the user_id in the query-string

function toggleUserBlocked(userId, currentStatus) {

  // Calculate the new status based on the current status
  const newStatus = currentStatus === 1 ? 0 : 1;

  // Create a new FormData object to hold the user ID and the new blocked status
  const formData = new FormData();
  formData.append('user_id', userId);
  formData.append('user_is_blocked', newStatus);

  // Send a POST request to the specified API endpoint to update the user's blocked status
  fetch('../api/api-toggle-user-blocked.php', {
      method: 'POST',
      body: formData
  })

  // Parse the response as JSON
  .then(response => response.json())

  // Handle the JSON data returned from the server
  .then(data => {

      // Check if the server returned an error message
      if (data.error) {

          // If an error message is present, throw an Error with the error message
          throw new Error(data.error);
      }

      // Reload the page to reflect the updated user status
      location.reload(); 
  })

  // Handle any errors that occur during the fetch request or JSON parsing
  .catch(error => {

      // Log the error message to the console
      console.error('Error updating user blocked status:', error);
  });
}
  
// ##########################################################################################

// SIGNUP ////////////////////
// Handles a user-signup, when submitting a form via POST-request

async function signup(){

  // Get the form element
  const frm = event.target  
  console.log(frm)

  // Send a POST request to the signup API endpoint with the form data
  const conn = await fetch("/api/api-signup.php", {
    method : "POST",
    body : new FormData(frm)
  })

  // Get the response data as text
  const data = await conn.text()
  console.log(data) 

  // Redirect the user to the login page after successful signup
  location.href="../views/login.php"

}

// ##########################################################################################

// LOGIN ////////////////////
// Handles a user-login, when submitting a form via POST-request

async function login(){

  // Get the form element
  const frm = event.target 
  console.log(frm)

  try {

    // Send a POST request to the login API endpoint with the form data
    const conn = await fetch("/api/api-login.php", {
      method : "POST",
      body : new FormData(frm)
    });

    // Check if the response is successful
    if (!conn.ok) {

      // Parse the error data from the response
      const errorData = await conn.json();

      // Check for specific error messages and handle accordingly
      if (conn.status === 403 && errorData.info === 'Your account is blocked. Please contact support.') {
        throw new Error('Your account is blocked. Please contact support.');
      }

      if (conn.status === 403 && errorData.info === 'Your account has been deleted and you cannot log in.') {
        throw new Error('Your account has been deleted and you cannot log in.');
      }

      throw new Error("Login failed");
    }

    // If login is successful, parse the response data
    // const data = await conn.json();

    // Redirect the user based on their role
    // switch (data.role_id_fk) {
    //   case 1:
    //     location.href = "../views/detective.php";
    //     break;
    //   case 2:
    //     location.href = "../views/lawyer.php";
    //     break;
    //   case 3:
    //     location.href = "../views/citizen.php";
    //     break;
    //   case 4:
    //     location.href = "../views/admin.php";
    //     break;
    //   default:
    //   throw new Error("Unknown user role");
    // }

    location.href = "../views/dashboard.php";

  } catch (error) {

    // Handle login errors
    if (error.message === 'Your account is blocked. Please contact support.') {
      alert('Your account is blocked. Please contact support.');
    } else if (error.message === 'Your account has been deleted and you cannot log in.') {
      alert('Your account has been deleted and you cannot log in.');
    } else {
      alert('Invalid email or password');
    }
    console.error("Login error:", error.message);
  }
}


// ##########################################################################################

// UPDATE //////////////////
// Handles a user-update, when submitting a form via POST-request

async function updateUser() {

  // Get the form element from the event target
  const frm = event.target; 
  console.log(frm);

  // Send a POST request to update the user information
  const conn = await fetch("/api/api-update-user.php", {
    method: 'POST',
    body: new FormData(frm)
  });
  
  // Get the response data as text
  const data = await conn.text();
  console.log(data);

  // Alert the user about the successful update
  alert('User updated successfully');
}

// ##########################################################################################

// DELETE //////////////////
// Handles a user-delete

function deleteUser(userId) {

  // Create a FormData object to hold the user ID
  const formData = new FormData();
  formData.append('user_id', userId);

  // Send a POST request to delete the user
  fetch('../api/api-delete-user.php', {
      method: 'POST',
      body: formData
  })

  // Parse the response as JSON
  .then(response => response.json())
  .then(data => {

      // Check for errors in the response data
      if (data.error) {
          throw new Error(data.error);
      }

      // Remove the user element from the DOM
      document.getElementById(`user-${userId}`).remove();
  })
  .catch(error => {

      // Log any errors that occur
      console.error('Error deleting user:', error);
  });
}