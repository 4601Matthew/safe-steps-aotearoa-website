<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Safe Steps Aotearoa - Improving home safety and accessibility for vulnerable people across New Zealand. Small steps. Big difference.">
    <title><?php echo isset($pageTitle) ? $pageTitle . ' - ' : ''; ?>Safe Steps Aotearoa</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header class="main-header">
        <div class="container">
            <div class="header-content">
                <div class="logo">
                    <a href="index.php">
                        <h1>🏠 Safe Steps Aotearoa</h1>
                        <p class="tagline">Small steps. Big difference.</p>
                    </a>
                </div>
                <button class="mobile-menu-toggle" aria-label="Toggle navigation menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <nav class="main-nav" id="mainNav">
                    <ul>
                        <li><a href="index.php" <?php echo (isset($_SERVER['PHP_SELF']) && basename($_SERVER['PHP_SELF']) == 'index.php') ? 'class="active"' : ''; ?>>Home</a></li>
                        <li><a href="about.php" <?php echo (isset($_SERVER['PHP_SELF']) && basename($_SERVER['PHP_SELF']) == 'about.php') ? 'class="active"' : ''; ?>>About Us</a></li>
                        <li><a href="services.php" <?php echo (isset($_SERVER['PHP_SELF']) && basename($_SERVER['PHP_SELF']) == 'services.php') ? 'class="active"' : ''; ?>>Our Services</a></li>
                        <li><a href="how-it-works.php" <?php echo (isset($_SERVER['PHP_SELF']) && basename($_SERVER['PHP_SELF']) == 'how-it-works.php') ? 'class="active"' : ''; ?>>How It Works</a></li>
                        <li><a href="get-involved.php" <?php echo (isset($_SERVER['PHP_SELF']) && basename($_SERVER['PHP_SELF']) == 'get-involved.php') ? 'class="active"' : ''; ?>>Get Involved</a></li>
                        <li><a href="contact.php" <?php echo (isset($_SERVER['PHP_SELF']) && basename($_SERVER['PHP_SELF']) == 'contact.php') ? 'class="active"' : ''; ?>>Contact</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
    <main>

