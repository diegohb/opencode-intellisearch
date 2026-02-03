@echo off
setlocal enabledelayedexpansion

echo ==========================================
echo TEST SUITE: pmx (npx/bunx) Installation Tests
echo Project: C:\dev\projects\playground\aigpt\test-websearch
echo ==========================================
echo.

set "PROJECT_ROOT=C:\dev\projects\playground\aigpt\test-websearch"
set "TEST_PATHS=%PROJECT_ROOT% %PROJECT_ROOT%\.opencode %PROJECT_ROOT%\testsub\subdir"
set "COUNT=0"

for %%P in (%TEST_PATHS%) do (
    for %%X in (npx bunx) do (
        set /a COUNT+=1
        echo.
        echo ==========================================
        echo TEST !COUNT!: %%X from %%P
        echo ==========================================
        
        cd /d "%%P"
        echo Current directory: %%cd%%
        echo.
        
        echo [INSTALL] Running: %%X opencode-intellisearch --local
        %%X opencode-intellisearch --local 2>&1
        set "INSTALL_RESULT=!ERRORLEVEL!"
        echo.
        
        echo [VERIFY] Checking if files exist:
        if exist "%PROJECT_ROOT%\.opencode\skills\intellisearch\SKILL.md" (
            echo   ✓ SKILL.md exists
        ) else (
            echo   ✗ SKILL.md NOT FOUND
        )
        if exist "%PROJECT_ROOT%\.opencode\commands\intellisearch.md" (
            echo   ✓ intellisearch.md exists
        ) else (
            echo   ✗ intellisearch.md NOT FOUND
        )
        echo.
        
        echo [UNINSTALL] Running: node C:\dev\projects\github\opencode-intellisearch\dist\bin\cli.js uninstall --local
        node "C:\dev\projects\github\opencode-intellisearch\dist\bin\cli.js" uninstall --local 2>&1
        echo.
        
        echo [CLEANUP VERIFY] Checking if files removed:
        if exist "%PROJECT_ROOT%\.opencode\skills\intellisearch" (
            echo   ✗ skills/intellisearch still exists
        ) else (
            echo   ✓ skills/intellisearch removed
        )
        if exist "%PROJECT_ROOT%\.opencode\commands\intellisearch.md" (
            echo   ✗ commands/intellisearch.md still exists
        ) else (
            echo   ✓ commands/intellisearch.md removed
        )
        echo.
        echo ------------------------------------------
    )
)

echo.
echo ==========================================
echo TEST SUITE COMPLETE
echo ==========================================

endlocal
