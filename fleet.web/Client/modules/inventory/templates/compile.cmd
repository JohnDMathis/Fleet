@echo off

SET _dir=%1

:: Remove quotes
   SET _dir=###%_dir%###
   SET _dir=%_dir:"###=%
   SET _dir=%_dir:###"=%
   SET _dir=%_dir:###=%


SET _tmpDir=%_dir%client\modules\inventory\templates\
SET _outputFile=%_dir%client\generated\inv-templates.js

handlebars "%_tmpDir%body.html"  -m -n "Handlebars.inv" -f  "%_outputFile%"

