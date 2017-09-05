@echo off

for /F %%a in (list.txt) do call :Q "%%a"
exit

:Q
set x=%~x1
if defined x cd > "mylist/%1" 0
if not defined x md "mylist/%1"

goto :EOF