@echo off
echo.
echo ============================================
echo   GITHUB DEPLOYMENT SCRIPT
echo ============================================
echo.
echo This script will help you deploy your website to GitHub Pages
echo.
echo STEP 1: Push to GitHub
echo ----------------------------------------
echo Run this command to push your code:
echo git push -u origin main
echo.
echo If you get authentication errors, you may need to:
echo 1. Install GitHub CLI: winget install GitHub.cli
echo 2. Or use GitHub Desktop application
echo 3. Or set up SSH keys
echo.
echo STEP 2: Enable GitHub Pages
echo ----------------------------------------
echo 1. Go to your repository on GitHub.com
echo 2. Click on "Settings" tab
echo 3. Scroll down to "Pages" section
echo 4. Under "Source", select "Deploy from a branch"
echo 5. Choose "main" branch and "/ (root)" folder
echo 6. Click "Save"
echo.
echo STEP 3: Access your website
echo ----------------------------------------
echo Your website will be available at:
echo https://ajizaenulm.github.io/quiz1-personal-website/
echo.
echo The deployment process may take 5-10 minutes.
echo.
echo ============================================
echo   ALTERNATIVE FREE HOSTING OPTIONS
echo ============================================
echo.
echo 1. NETLIFY (Easy drag-and-drop)
echo    - Go to netlify.com
echo    - Drag your quiz1 folder to deploy
echo    - Instant deployment
echo.
echo 2. VERCEL (GitHub integration)
echo    - Go to vercel.com
echo    - Import from GitHub
echo    - Automatic deployments
echo.
echo 3. SURGE.SH (Command line)
echo    - npm install -g surge
echo    - surge (from your project folder)
echo.
echo Press any key to continue...
pause >nul