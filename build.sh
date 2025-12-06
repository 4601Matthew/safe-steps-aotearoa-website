#!/bin/bash
# Build script for Cloudflare Pages
# This script renders PHP files to static HTML

echo "Building static site for Cloudflare Pages..."

# Check if PHP is available
if ! command -v php &> /dev/null; then
    echo "Error: PHP is not installed or not in PATH"
    exit 1
fi

# Run the PHP build script
php build.php

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Build completed successfully!"
    exit 0
else
    echo "Build failed!"
    exit 1
fi

