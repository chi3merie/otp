$ProgressPreference = 'SilentlyContinue'
$url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5S2gj3qHz5WLVW5SAOPz-mxXjvRdVpqKsKz1OEkFiptb2cfbSfUwv_7I&s=10'
$out = 'C:\Users\hp\Desktop\pharmacystore\public\images\products\med_omeprazole.jpg'
try {
    Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing -ErrorAction Stop
    Write-Output 'OK'
    Get-Item $out | Select-Object Name, Length
} catch {
    Write-Output ('FAIL: ' + $_.Exception.Message)
}