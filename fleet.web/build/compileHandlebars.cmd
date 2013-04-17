@echo off

SET _dir=%1

:: Remove quotes
   SET _dir=###%_dir%###
   SET _dir=%_dir:"###=%
   SET _dir=%_dir:###"=%
   SET _dir=%_dir:###=%


