$ProgressPreference = 'SilentlyContinue'
$url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjnACaTYrGkl60pZEAkL4q4iGkQ2bPKBp05jxbadJ8aQ&s=10'
$out = 'C:\Users\hp\Desktop\pharmacystore\public\images\products\med_cetirizine.jpg'
try {
    Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing -ErrorAction Stop
    Write-Output 'OK'
    Get-Item $out | Select-Object Name, Length
} catch {
    Write-Output ('FAIL: ' + $_.Exception.Message)
}