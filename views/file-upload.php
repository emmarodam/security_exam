<?php

require_once __DIR__ . '/_header.php';  
require_once __DIR__ . '/../_.php';

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

        <?php require_once __DIR__ . '/../api/api-navigation.php'  ?>

        <form action="logout.php" method="POST" class="logout">
                <button> Log out </button>
            </form>
        </div>

    </section>

    <!-- Right side -->
    <section class="dashboard-content">

        <h2>File Upload</h2>
        <form id="file-upload" action="../api/api-upload-files.php" method="post" enctype="multipart/form-data">
            <label for="file_name">File Name:</label>
            <input type="text" id="file_name" name="file_name">
            <label for="case_id">Case ID:</label>
            <input type="text" id="case_id" name="case_id">
            <input type="file" name="file">
            <input type="submit" value="Upload">
        </form>
        
    </section>

    
</main>