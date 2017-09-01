rem Каталоги в файле list.txt должны раделятся обратным слешом. 
rem Пример: myfolder\mycatalog\myfile.txt
rem В 6 строке /F указывается раздел диска

@echo off

for /F %%a in (list.txt) do call :Q "%%a"
exit

:Q
set x=%~x1
if defined x cd > "mylist/%1" 0
if not defined x md "mylist/%1"

goto :EOF