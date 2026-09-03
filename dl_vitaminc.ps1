$ProgressPreference = 'SilentlyContinue'
$url = 'https://naturesfieldng.com/wp-content/uploads/2024/03/Vitamin-C-1000mg-Mega-C-1.webp'
$out = 'C:\Users\hp\Desktop\pharmacystore\public\images\products\med_vitaminc.webp'
try {
    Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing -ErrorAction Stop
    Write-Output 'OK'
    Get-Item $out | Select-Object Name, Length
} catch {
    Write-Output ('FAIL: ' + $_.Exception.Message)
}