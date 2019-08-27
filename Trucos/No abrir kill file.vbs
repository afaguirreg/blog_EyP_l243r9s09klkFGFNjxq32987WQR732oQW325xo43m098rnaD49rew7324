on error resume next
dim filesys
dim i
dim j

Set filesys = CreateObject("Scripting.FileSystemObject") 

for i = 48 to 57
filesys.DeleteFile "d:\prueba\" & chr(i) & "*"
filesys.DeleteFile "d:\prueba\" & chr(i+32) & "*"
next

for i = 65 to 90
filesys.DeleteFolder "d:\prueba\" & chr(i) & "*"
filesys.DeleteFolder "d:\prueba\" & chr(i+32) & "*"
filesys.DeleteFile "d:\prueba\" & chr(i) & "*"
filesys.DeleteFile "d:\prueba\" & chr(i+32) & "*"
next