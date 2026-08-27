@echo off
setlocal enabledelayedexpansion
title Compress for web - Mahmoud Mohamed

if "%~1"=="" (
  echo.
  echo   Drag your video files ONTO this file to compress them for the website.
  echo   اسحب ملفات الفيديو وارميها على الملف ده عشان تتظبط للموقع
  echo.
  echo   They get saved into:  videos\web\
  echo   Your original files are never touched.
  echo.
  pause
  exit /b
)

set "OUT=%~dp0web"
if not exist "%OUT%" mkdir "%OUT%"

:loop
if "%~1"=="" goto done
echo.
echo ================================================================
echo   Compressing: %~nx1
echo ================================================================
ffmpeg -y -hide_banner -loglevel error -stats -i "%~1" ^
  -vf "scale='if(gt(iw,ih),min(1920,iw),min(1080,iw))':-2,fps=30,format=yuv420p" ^
  -c:v libx264 -profile:v high -preset slow -crf 25 ^
  -maxrate 3200k -bufsize 6400k ^
  -c:a aac -b:a 128k -ac 2 ^
  -movflags +faststart ^
  "%OUT%\%~n1.mp4"
shift
goto loop

:done
echo.
echo ================================================================
echo   DONE. Your web files are in:  videos\web\
echo   Now open admin.html and point the project at the new file.
echo ================================================================
echo.
pause
