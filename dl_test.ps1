Set-Location 'C:\Users\hp\Desktop\pharmacystore'
New-Item -ItemType Directory -Path 'public\images\products' -Force | Out-Null
try {
  Invoke-WebRequest -Uri 'https://source.unsplash.com/400x400/?pills,medicine' -OutFile 'public\images\products\test.jpg' -TimeoutSec 25 -ErrorAction Stop
  $f = Get-Item 'public\images\products\test.jpg'
  $b = [System.IO.File]::ReadAllBytes('public\images\products\test.jpg')
  $info = "OK size=$($f.Length) b0=0x$('{0:x2}'-f $b[0]) b1=0x$('{0:x2}'-f $b[1])"
} catch {
  $info = "ERR $($_.Exception.Message)"
}
$info | Out-File 'public\images\products\_test.txt' -Encoding ascii
"" | Out-File 'public\images\products\_test_done.txt' -Encoding ascii