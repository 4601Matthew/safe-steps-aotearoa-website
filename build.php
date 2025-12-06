<?php
/**
 * Build script to convert PHP pages to static HTML for Cloudflare Pages
 * Run: php build.php
 */

$outputDir = __DIR__ . '/dist';
$sourceDir = __DIR__;

// Create output directory if it doesn't exist
if (!file_exists($outputDir)) {
    mkdir($outputDir, 0755, true);
}

// Create subdirectories
$dirs = ['css', 'js', 'includes'];
foreach ($dirs as $dir) {
    if (!file_exists($outputDir . '/' . $dir)) {
        mkdir($outputDir . '/' . $dir, 0755, true);
    }
}

// Pages to build
$pages = [
    'index.php' => 'index.html',
    'about.php' => 'about.html',
    'services.php' => 'services.html',
    'how-it-works.php' => 'how-it-works.html',
    'get-involved.php' => 'get-involved.html',
    'contact.php' => 'contact.html'
];

echo "Building static site...\n";

// Copy static assets
echo "Copying assets...\n";
copyFiles($sourceDir . '/css', $outputDir . '/css');
copyFiles($sourceDir . '/js', $outputDir . '/js');

// Build each page
foreach ($pages as $phpFile => $htmlFile) {
    echo "Building $phpFile -> $htmlFile...\n";
    buildPage($sourceDir . '/' . $phpFile, $outputDir . '/' . $htmlFile);
}

// Copy any other static files
if (file_exists($sourceDir . '/assets')) {
    copyFiles($sourceDir . '/assets', $outputDir . '/assets');
}

// Create _redirects file for Cloudflare Pages
createRedirectsFile($outputDir, $pages);

echo "Build complete! Output in: $outputDir\n";

/**
 * Build a PHP page to static HTML
 */
function buildPage($phpFile, $htmlFile) {
    if (!file_exists($phpFile)) {
        echo "Warning: $phpFile not found\n";
        return;
    }
    
    // Start output buffering
    ob_start();
    
    // Include the PHP file
    include $phpFile;
    
    // Get the output
    $html = ob_get_clean();
    
    // Fix links from .php to .html
    $html = preg_replace('/href="([^"]+)\.php"/', 'href="$1.html"', $html);
    $html = preg_replace("/href='([^']+)\.php'/", "href='$1.html'", $html);
    
    // Fix anchor links with .php
    $html = preg_replace('/href="([^"]+)\.php#([^"]+)"/', 'href="$1.html#$2"', $html);
    
    // Fix active navigation state - since we're static, use JavaScript to set active state
    // The PHP active state won't work, so we'll rely on JavaScript
    
    // Write to HTML file
    file_put_contents($htmlFile, $html);
}

/**
 * Copy files from source to destination
 */
function copyFiles($src, $dst) {
    if (!file_exists($src)) {
        return;
    }
    
    $iterator = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($src, RecursiveDirectoryIterator::SKIP_DOTS),
        RecursiveIteratorIterator::SELF_FIRST
    );
    
    foreach ($iterator as $item) {
        $dstPath = $dst . DIRECTORY_SEPARATOR . $iterator->getSubPathName();
        
        if ($item->isDir()) {
            if (!file_exists($dstPath)) {
                mkdir($dstPath, 0755, true);
            }
        } else {
            copy($item, $dstPath);
        }
    }
}

/**
 * Create _redirects file for Cloudflare Pages
 */
function createRedirectsFile($outputDir, $pages) {
    $redirects = [];
    
    // Add redirects for .php to .html
    foreach ($pages as $phpFile => $htmlFile) {
        $phpBase = str_replace('.php', '', $phpFile);
        $htmlBase = str_replace('.html', '', $htmlFile);
        if ($phpBase !== 'index') {
            $redirects[] = "/$phpBase.php /$htmlBase.html 301";
            $redirects[] = "/$phpBase /$htmlBase.html 301";
        }
    }
    
    // Root redirect
    $redirects[] = "/index.php /index.html 301";
    
    file_put_contents($outputDir . '/_redirects', implode("\n", $redirects));
    echo "Created _redirects file\n";
}

