@echo off

SET _dir=%1
SET _outputFile=%2

:: Remove quotes
   SET _dir=###%_dir%###
   SET _dir=%_dir:"###=%
   SET _dir=%_dir:###"=%
   SET _dir=%_dir:###=%

SET _tmpDir=%_dir%client\modules\inventory\templates\

handlebars "%_tmpDir%body.html" "%_tmpDir%footer.html" "%_tmpDir%header.html" -a -m -f "%_dir%%_outputFile%"
