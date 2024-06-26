<?php

require_once __DIR__ . '/../_.php';
require_once __DIR__ . '/_header.php';  

$user = $_SESSION['user'];
$user_id = $_SESSION['user']['user_id'];

if (!isset($_SESSION['user'])){
    header("Location: login");
}
?>


<main class="dashboard">

    <!-- Left side -->
    <section class="dashboard-menu">

        <!-- Top-Left -->
        <div class="dashboard-menu-top">
            
            <!-- Make sure to sanitize output with htmlspecialchars to prevent XSS attacks -->
            <img src="/images/profile-dark.png" alt="user_profile"> <br>
            <span id="user_name"> <?= htmlspecialchars($user['user_name']) ?> </span> <span id="user_last_name"> <?= htmlspecialchars($user['user_last_name']) ?> </span> </span>
            <p id="user_role"> <?= htmlspecialchars($user['role_name']) ?> </p>

        </div>
       
        <!-- Bottom-Left -->
        <div class="dashboard-menu-bottom">

            <div>

                <div class="dashboard-menu-links">
                    <img src="/images/dashboard-light.png" alt="Dashboard">
                    <a href="/views/dashboard.php"> Dashboard </a>
                </div>

                <div class="dashboard-menu-links">
                    <img src="/images/profile-dark.png" alt="Profile">
                    <a href="/views/view_profile.php"> View profile </a>
                </div>

                <div class="dashboard-menu-links">
                    <img src="/images/users-dark.png" alt="Users">
                    <a href="/views/users.php"> View users </a>
                </div>

                <div class="dashboard-menu-links-active">
                    <img src="/images/case-dark.png" alt="Case">
                    <a href="/views/create-case.php"> Create new case </a>
                </div>

                <div class="dashboard-menu-links">
                    <img src="/images/cases-dark.png" alt="Cases">
                    <a href="/views/cases.php"> View cases </a>
                </div>

                <div class="dashboard-menu-links">
                    <img src="/images/file-dark.png" alt="File">
                    <a href="/views/files.php"> File registry </a>
                </div>

            </div>

            <form action="logout.php" method="POST" class="logout">
                <button> Log out </button>
            </form>
        </div>

    </section>

    <!-- Right side -->
    <section class="dashboard-content">

        <form id="create-case-form" onsubmit="makeCase(); return false">
            <label for="case_description">Description:</label>
            <textarea id="case_description" name="case_description" required></textarea>

            <label for="case_suspect">Suspect:</label>
            <input type="text" id="case_suspect" name="case_suspect" required>

            <label for="case_type">Type:</label>
            <input type="text" id="case_type" name="case_type" required>

            <label for="case_location">Location:</label>
            <input type="text" id="case_location" name="case_location" required>

            <button type="submit">Create Case</button>
        </form>
        
    </section>

    
    
</main>

<?php require_once __DIR__ . '/_footer.php'  ?>